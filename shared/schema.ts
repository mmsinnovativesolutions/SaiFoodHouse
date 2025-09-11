import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  brand: text("brand").notNull(),
  productName: text("product_name").notNull(),
  weightPack: text("weight_pack").notNull(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  companyName: text("company_name"),
  phone: text("phone"),
  productInterest: text("product_interest"),
  quantity: text("quantity"),
  enquiryType: text("enquiry_type").default("general"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertBulkEnquirySchema = insertContactSchema.extend({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  productInterest: z.string().min(1, "Please specify your product interest"),
  quantity: z.string().min(1, "Please specify required quantity"),
  enquiryType: z.literal("bulk").default("bulk"),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertBulkEnquiry = z.infer<typeof insertBulkEnquirySchema>;
export type Contact = typeof contacts.$inferSelect;
