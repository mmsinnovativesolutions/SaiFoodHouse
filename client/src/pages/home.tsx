import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { type Product } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: brands = [] } = useQuery<{ brand: string; productCount: number }[]>({
    queryKey: ["/api/brands"],
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const totalBrands = brands.length;
  const totalProducts = products.length;

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="hero-title">
              Food & Beverage Product Catalog
            </h1>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto" data-testid="hero-subtitle">
              Discover trusted brands and their products in one place.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Search by brand or product name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-6 py-4 text-lg text-foreground bg-background rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent border border-border"
                  data-testid="main-search"
                />
                <Button
                  onClick={handleSearch}
                  className="px-8 py-4 bg-accent text-accent-foreground rounded-r-lg hover:bg-secondary transition-colors border border-l-0 border-border"
                  data-testid="search-button"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-card py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card>
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-primary mb-2" data-testid="total-brands">
                  {totalBrands}+
                </div>
                <div className="text-muted-foreground">Trusted Brands</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-primary mb-2" data-testid="total-products">
                  {totalProducts}+
                </div>
                <div className="text-muted-foreground">Quality Products</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Catalog Access</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Catalog</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our comprehensive collection of food and beverage products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/brands">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" data-testid="browse-brands-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Browse Brands</h3>
                  <p className="text-muted-foreground">
                    Explore our collection of {totalBrands} trusted brands
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/products">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" data-testid="view-products-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">View All Products</h3>
                  <p className="text-muted-foreground">
                    Browse our complete catalog of {totalProducts} products
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
