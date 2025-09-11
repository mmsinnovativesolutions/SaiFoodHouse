import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="hero-gradient text-primary-foreground py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Food & Beverage Catalog</h3>
            <p className="text-primary-foreground/80 mb-4">
              Your trusted source for discovering quality food and beverage products from leading brands.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="social-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="social-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="footer-home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/brands" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="footer-brands"
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="footer-products"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  data-testid="footer-contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Beverages</li>
              <li>Snacks & Confectionery</li>
              <li>Sauces & Condiments</li>
              <li>Dairy Products</li>
              <li>Bakery Items</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80">
            &copy; 2024 Food & Beverage Catalog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
