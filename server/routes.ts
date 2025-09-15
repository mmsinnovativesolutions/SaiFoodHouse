import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import * as XLSX from "xlsx";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.mimetype === 'application/vnd.ms-excel') {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for debugging
  app.get("/api/health", async (_req, res) => {
    try {
      const productCount = await storage.getAllProducts().then(products => products.length);
      const brandCount = await storage.getAllBrands().then(brands => brands.length);
      res.json({ 
        status: "ok",
        database: "connected",
        productCount,
        brandCount,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      });
    } catch (error) {
      res.status(500).json({ 
        status: "error", 
        database: "disconnected",
        error: error instanceof Error ? error.message : 'Unknown error',
        environment: process.env.NODE_ENV || 'development'
      });
    }
  });

  // Get all products
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getAllProducts();
      console.log(`[API] Fetched ${products.length} products`);
      res.json(products);
    } catch (error) {
      console.error('[API] Failed to fetch products:', error);
      res.status(500).json({ message: "Failed to fetch products", error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  // Get products by brand
  app.get("/api/products/brand/:brand", async (req, res) => {
    try {
      const { brand } = req.params;
      const products = await storage.getProductsByBrand(brand);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by brand" });
    }
  });

  // Search products
  app.get("/api/products/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      const products = await storage.searchProducts(q);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to search products" });
    }
  });

  // Get all brands with product counts
  app.get("/api/brands", async (_req, res) => {
    try {
      const brands = await storage.getAllBrands();
      console.log(`[API] Fetched ${brands.length} brands`);
      res.json(brands);
    } catch (error) {
      console.error('[API] Failed to fetch brands:', error);
      res.status(500).json({ message: "Failed to fetch brands", error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  // Create contact
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ message: "Contact message sent successfully", contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid contact data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to send contact message" });
    }
  });

  // Simple admin authentication middleware
  const requireAdminAuth = (req: any, res: any, next: any) => {
    const adminToken = req.headers['x-admin-token'] || req.query.adminToken;
    const expectedToken = process.env.ADMIN_TOKEN || 'saifood12345'; // Default password
    
    if (adminToken !== expectedToken) {
      return res.status(401).json({ message: "Unauthorized. Admin access required." });
    }
    next();
  };

  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      const expectedPassword = process.env.ADMIN_TOKEN || 'saifood12345';
      
      if (password !== expectedPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }
      
      res.json({ 
        message: "Login successful", 
        token: expectedPassword 
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Upload Excel file and import products (with authentication)
  app.post("/api/admin/upload-excel", requireAdminAuth, upload.single('excel'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No Excel file uploaded" });
      }

      // Parse Excel file
      const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // Validate and transform data
      const products = [];
      const errors = [];
      
      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i] as any;
        
        // Expected columns: BRAND/COMPANY, PRODUCT NAME, WEIGHT/PACK
        const brand = row['BRAND/COMPANY'] || row['BRAND'] || row['COMPANY'] || row['Brand'] || row['Company'];
        const productName = row['PRODUCT NAME'] || row['Product Name'] || row['PRODUCT_NAME'] || row['Product'];
        const weightPack = row['WEIGHT/PACK'] || row['Weight/Pack'] || row['WEIGHT_PACK'] || row['Weight'] || row['Pack'];
        
        if (!brand || !productName || !weightPack) {
          errors.push({
            row: i + 2, // +2 because row 1 is header and array is 0-indexed
            message: `Missing required fields. Expected: BRAND/COMPANY, PRODUCT NAME, WEIGHT/PACK`,
            data: row
          });
          continue;
        }
        
        products.push({
          brand: String(brand).trim(),
          productName: String(productName).trim(),
          weightPack: String(weightPack).trim()
        });
      }
      
      if (errors.length > 0 && products.length === 0) {
        return res.status(400).json({
          message: "No valid products found in Excel file",
          errors: errors.slice(0, 10) // Return first 10 errors
        });
      }
      
      // Atomically replace all products (transaction ensures data safety)
      const createdProducts = await storage.replaceAllProducts(products);
      
      res.status(200).json({
        message: `Successfully imported ${createdProducts.length} products`,
        importedCount: createdProducts.length,
        errors: errors.length > 0 ? errors.slice(0, 5) : [] // Return first 5 errors as warnings
      });
      
    } catch (error) {
      console.error('Excel upload error:', error);
      res.status(500).json({ 
        message: "Failed to process Excel file",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
