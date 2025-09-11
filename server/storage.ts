import { type Product, type InsertProduct, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductsByBrand(brand: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string): Promise<Product[]>;
  getAllBrands(): Promise<{ brand: string; productCount: number }[]>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.products = new Map();
    this.contacts = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
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

    sampleProducts.forEach(product => {
      const id = randomUUID();
      const fullProduct: Product = { ...product, id };
      this.products.set(id, fullProduct);
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByBrand(brand: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      product => 
        product.productName.toLowerCase().includes(lowerQuery) ||
        product.brand.toLowerCase().includes(lowerQuery)
    );
  }

  async getAllBrands(): Promise<{ brand: string; productCount: number }[]> {
    const brandCounts = new Map<string, number>();
    
    Array.from(this.products.values()).forEach(product => {
      const count = brandCounts.get(product.brand) || 0;
      brandCounts.set(product.brand, count + 1);
    });

    return Array.from(brandCounts.entries()).map(([brand, productCount]) => ({
      brand,
      productCount
    })).sort((a, b) => a.brand.localeCompare(b.brand));
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date().toISOString()
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
