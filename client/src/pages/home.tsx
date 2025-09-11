import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Search, Coffee, Package, ShoppingBag, Award, Clock, Users } from "lucide-react";
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
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2" data-testid="total-brands">
                  {totalBrands}+
                </div>
                <div className="text-orange-700/80 dark:text-orange-300/80 font-medium">Trusted Brands</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2" data-testid="total-products">
                  {totalProducts}+
                </div>
                <div className="text-green-700/80 dark:text-green-300/80 font-medium">Quality Products</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
                <div className="text-purple-700/80 dark:text-purple-300/80 font-medium">Catalog Access</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-green-50 dark:from-blue-900/10 dark:via-gray-900 dark:to-green-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Explore Our Catalog
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our comprehensive collection of food and beverage products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/brands">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800" data-testid="browse-brands-card">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Coffee className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Browse Brands</h3>
                  <p className="text-blue-600/80 dark:text-blue-400/80">
                    Explore our collection of {totalBrands} trusted brands
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/products">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-800" data-testid="view-products-card">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <ShoppingBag className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-300">View All Products</h3>
                  <p className="text-green-600/80 dark:text-green-400/80">
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
