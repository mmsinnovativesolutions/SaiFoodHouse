import { type Product, type InsertProduct, type Contact, type InsertContact, products, contacts } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, sql } from "drizzle-orm";

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductsByBrand(brand: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string): Promise<Product[]>;
  getAllBrands(): Promise<{ brand: string; productCount: number }[]>;
  
  // Bulk operations for Excel import
  clearAllProducts(): Promise<void>;
  createProducts(products: InsertProduct[]): Promise<Product[]>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
}

export class DatabaseStorage implements IStorage {
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductsByBrand(brand: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.brand, brand));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchPattern = `%${query}%`;
    return await db.select().from(products).where(
      sql`${products.productName} ILIKE ${searchPattern} OR ${products.brand} ILIKE ${searchPattern}`
    );
  }

  async getAllBrands(): Promise<{ brand: string; productCount: number }[]> {
    const result = await db
      .select({
        brand: products.brand,
        productCount: sql<number>`count(*)::int`
      })
      .from(products)
      .groupBy(products.brand)
      .orderBy(products.brand);
    
    return result;
  }

  async clearAllProducts(): Promise<void> {
    await db.delete(products);
  }

  async createProducts(insertProducts: InsertProduct[]): Promise<Product[]> {
    if (insertProducts.length === 0) return [];
    
    const createdProducts = await db
      .insert(products)
      .values(insertProducts)
      .returning();
    return createdProducts;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  // Method to initialize sample data in database
  async initializeSampleData(): Promise<void> {
    const sampleProducts: InsertProduct[] = [
      // Veeba Products
      { brand: "Veeba", productName: "Mint Mayo", weightPack: "255 Gm" },
      { brand: "Veeba", productName: "Thousand Island Dressing", weightPack: "300 Gm" },
      { brand: "Veeba", productName: "Caesar Salad Dressing", weightPack: "285 Gm" },
      { brand: "Veeba", productName: "Veg Mayonnaise", weightPack: "875 Gm" },
      { brand: "Veeba", productName: "Hot & Sweet Sauce", weightPack: "320 Gm" },
      { brand: "Veeba", productName: "Schezwan Sauce", weightPack: "310 Gm" },
      
      // Nestle Products
      { brand: "Nestle", productName: "Nescafe Classic Coffee", weightPack: "200 Gm" },
      { brand: "Nestle", productName: "KitKat Chocolate", weightPack: "12*37.3 Gm" },
      { brand: "Nestle", productName: "Maggi Noodles", weightPack: "12*70 Gm" },
      { brand: "Nestle", productName: "Cerelac Baby Food", weightPack: "300 Gm" },
      { brand: "Nestle", productName: "Milo Health Drink", weightPack: "500 Gm" },
      { brand: "Nestle", productName: "Aero Chocolate", weightPack: "36 Gm" },
      
      // Britannia Products
      { brand: "Britannia", productName: "Good Day Cookies", weightPack: "24*75 Gm" },
      { brand: "Britannia", productName: "Marie Gold Biscuits", weightPack: "250 Gm" },
      { brand: "Britannia", productName: "Tiger Biscuits", weightPack: "12*65 Gm" },
      { brand: "Britannia", productName: "Bourbon Cream Biscuit", weightPack: "6*120 Gm" },
      { brand: "Britannia", productName: "NutriChoice Digestive", weightPack: "200 Gm" },
      { brand: "Britannia", productName: "Little Hearts", weightPack: "37 Gm" },
      
      // Cadbury Products
      { brand: "Cadbury", productName: "Dairy Milk Chocolate", weightPack: "13 Gm" },
      { brand: "Cadbury", productName: "5 Star Chocolate", weightPack: "22 Gm" },
      { brand: "Cadbury", productName: "Gems Chocolate", weightPack: "17.8 Gm" },
      { brand: "Cadbury", productName: "Perk Chocolate", weightPack: "14 Gm" },
      { brand: "Cadbury", productName: "Eclairs Toffee", weightPack: "289 Gm" },
      
      // Parle Products
      { brand: "Parle", productName: "Parle-G Biscuits", weightPack: "200 Gm" },
      { brand: "Parle", productName: "Monaco Biscuits", weightPack: "63.6 Gm" },
      { brand: "Parle", productName: "Hide & Seek Cookies", weightPack: "100 Gm" },
      { brand: "Parle", productName: "Krackjack Biscuits", weightPack: "200 Gm" },
      
      // Coca Cola Products
      { brand: "Coca Cola", productName: "Coca Cola Soft Drink", weightPack: "12*200 ML" },
      { brand: "Coca Cola", productName: "Sprite Soft Drink", weightPack: "12*200 ML" },
      { brand: "Coca Cola", productName: "Fanta Orange", weightPack: "12*200 ML" },
      { brand: "Coca Cola", productName: "Thums Up", weightPack: "12*200 ML" },
      
      // Imported Products
      { brand: "Imported", productName: "Belgian Dark Chocolate", weightPack: "100 Gm" },
      { brand: "Imported", productName: "Italian Pasta", weightPack: "500 Gm" },
      { brand: "Imported", productName: "Swiss Cheese", weightPack: "200 Gm" },
      { brand: "Imported", productName: "French Cookies", weightPack: "150 Gm" },
      
      // Abbies Products
      { brand: "Abbies", productName: "Honey Roasted Nuts", weightPack: "200 Gm" },
      { brand: "Abbies", productName: "Trail Mix", weightPack: "150 Gm" },
      { brand: "Abbies", productName: "Dried Fruits Mix", weightPack: "250 Gm" },
      { brand: "Abbies", productName: "Granola Bars", weightPack: "6*25 Gm" },
    ];

    // Check if data already exists
    const existingProducts = await this.getAllProducts();
    if (existingProducts.length === 0) {
      // Insert sample data
      await db.insert(products).values(sampleProducts);
    }
  }
}

export const storage = new DatabaseStorage();

// Initialize sample data on startup
storage.initializeSampleData().catch(console.error);
