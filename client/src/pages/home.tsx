import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Search, Coffee, Package, ShoppingBag, Award, Clock, Users, Heart, Shield, Star, Truck, Building, HandHeart, Target, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { type Product } from "@shared/schema";

// Import generated background images
import productFlatlayBg from "@assets/generated_images/Food_beverage_product_flatlay_97becb28.png";
import groceryShelveBg from "@assets/generated_images/Grocery_store_product_shelves_e2e5fcad.png";
import abstractIconsBg from "@assets/generated_images/Abstract_food_beverage_icons_12ad5560.png";

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
              Sai Food House
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto" data-testid="hero-subtitle">
              Your Trusted Wholesale Partner for Food & Beverage Distribution
            </p>
            <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto" data-testid="hero-description">
              Serving retailers, restaurants, and institutions with quality products from trusted brands across India.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/brands">
                <Button className="px-8 py-4 bg-white text-black hover:bg-gray-100 transition-colors text-lg font-semibold rounded-lg shadow-lg" data-testid="cta-browse-brands">
                  Browse Brands
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="px-8 py-4 bg-accent text-accent-foreground hover:bg-secondary transition-colors text-lg font-semibold rounded-lg shadow-lg border-2 border-white" data-testid="cta-bulk-enquiry">
                  Bulk Enquiry
                </Button>
              </Link>
            </div>
            
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

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-indigo-900/10 dark:via-gray-900 dark:to-cyan-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${productFlatlayBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              About Sai Food House
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your dedicated wholesale partner specializing in food and beverage distribution across India. 
              We connect trusted brands with retailers, restaurants, and institutions through reliable supply chain solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-rose-700 dark:text-rose-300">Quality Assurance</h3>
                <p className="text-rose-600/80 dark:text-rose-400/80 leading-relaxed">
                  We maintain strict quality standards and partner only with certified brands and suppliers who meet our rigorous quality requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-300">Reliable Distribution</h3>
                <p className="text-emerald-600/80 dark:text-emerald-400/80 leading-relaxed">
                  Our extensive distribution network ensures timely delivery of products to your business location with complete transparency and tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <HandHeart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-amber-700 dark:text-amber-300">Customer Success</h3>
                <p className="text-amber-600/80 dark:text-amber-400/80 leading-relaxed">
                  Dedicated support team and flexible ordering solutions designed to help your business grow and succeed in the competitive market.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-2xl p-8 md:p-12 border border-blue-200/50 dark:border-blue-800/50">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <Building className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  Serving Businesses Across India
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  From neighborhood grocery stores to large restaurant chains and institutional kitchens, Sai Food House provides 
                  comprehensive wholesale solutions tailored to meet diverse business requirements and scale with your growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-900/10 dark:via-purple-900/10 dark:to-fuchsia-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${abstractIconsBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Driving the future of food & beverage distribution with unwavering commitment to quality and service excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 hover:shadow-2xl transition-all duration-300 hover:scale-105" data-testid="mission-card">
              <CardContent className="p-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-8 shadow-lg">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300" data-testid="mission-title">
                    Our Mission
                  </h3>
                  <p className="text-lg text-blue-600/90 dark:text-blue-400/90 leading-relaxed" data-testid="mission-text">
                    To be the most trusted wholesale distribution partner for food and beverage businesses across India. 
                    We are committed to delivering exceptional quality products, reliable supply chain solutions, and 
                    outstanding customer service that empowers retailers, restaurants, and institutions to thrive in their markets.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Vision Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 hover:shadow-2xl transition-all duration-300 hover:scale-105" data-testid="vision-card">
              <CardContent className="p-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-8 shadow-lg">
                    <Eye className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-purple-700 dark:text-purple-300" data-testid="vision-title">
                    Our Vision
                  </h3>
                  <p className="text-lg text-purple-600/90 dark:text-purple-400/90 leading-relaxed" data-testid="vision-text">
                    To become India's leading food and beverage distribution network, setting new standards in wholesale excellence. 
                    We envision expanding our reach nationwide while fostering long-term partnerships that drive mutual growth and 
                    contribute to India's thriving food industry ecosystem.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Supporting Values */}
          <div className="mt-16 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 dark:from-violet-400/10 dark:to-fuchsia-400/10 rounded-2xl p-8 md:p-12 border border-violet-200/50 dark:border-violet-800/50">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100" data-testid="values-title">
                Built on Core Values
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center" data-testid="value-integrity">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-emerald-700 dark:text-emerald-300">Integrity</h4>
                  <p className="text-emerald-600/80 dark:text-emerald-400/80">Honest, transparent business practices in every interaction</p>
                </div>
                <div className="text-center" data-testid="value-excellence">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-amber-700 dark:text-amber-300">Excellence</h4>
                  <p className="text-amber-600/80 dark:text-amber-400/80">Continuous improvement in service quality and operations</p>
                </div>
                <div className="text-center" data-testid="value-partnership">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-rose-700 dark:text-rose-300">Partnership</h4>
                  <p className="text-rose-600/80 dark:text-rose-400/80">Building lasting relationships that drive mutual success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 py-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-8 dark:opacity-5"
          style={{ backgroundImage: `url(${groceryShelveBg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-blue-50/80 dark:from-slate-900/80 dark:to-blue-900/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2" data-testid="total-brands">
                  {totalBrands}+
                </div>
                <div className="text-orange-700/80 dark:text-orange-300/80 font-medium">Partner Brands</div>
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
                <div className="text-purple-700/80 dark:text-purple-300/80 font-medium">Order Support</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-green-50 dark:from-blue-900/10 dark:via-gray-900 dark:to-green-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-6 dark:opacity-4"
          style={{ backgroundImage: `url(${abstractIconsBg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/70 via-white/70 to-green-50/70 dark:from-blue-900/70 dark:via-gray-900/70 dark:to-green-900/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Explore Our Product Range
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive collection of food and beverage products from trusted brands.
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
                    Explore our collection of {totalBrands} partner brands
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