import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Search, Package, Star, TrendingUp, Sparkles, Coffee, ShoppingBag, Heart, Home, User, Grid, Filter, Award, Building, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import BrandCard from "@/components/brand-card";

// Import generated background images
import productFlatlayBg from "@assets/generated_images/Food_beverage_product_flatlay_97becb28.png";
import groceryShelveBg from "@assets/generated_images/Grocery_store_product_shelves_e2e5fcad.png";
import abstractIconsBg from "@assets/generated_images/Abstract_food_beverage_icons_12ad5560.png";

export default function Brands() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all-brands");

  const { data: brands = [], isLoading } = useQuery<{ brand: string; productCount: number }[]>({
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

  const handleBrandClick = (brandName: string) => {
    setLocation(`/products?brand=${encodeURIComponent(brandName)}`);
  };

  // Filter brands based on search and active tab
  const filteredBrands = brands.filter(brand =>
    brand.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Categorize brands for different tabs
  const categorizedBrands = {
    "Food & Snacks": brands.filter(b => 
      ['britannia', 'parle', 'haldiram', 'bikano', 'mtr', 'bambino', 'everest', 'mdh', 'amul', 'mother dairy', 'patanjali', 'fortune', 'aashirvaad', 'pillsbury', 'maggi', 'knorr', 'kissan', 'catch', 'tata sampann', 'dawat', 'india gate', 'kohinoor', 'lays', 'kurkure', 'bingo', 'uncle chipps'].some(food => 
        b.brand.toLowerCase().includes(food.toLowerCase()) || b.brand.toLowerCase().replace(/[^a-z0-9]/g, '').includes(food.toLowerCase().replace(/[^a-z0-9]/g, ''))
      )
    ),
    "Beverages": brands.filter(b => 
      ['coca-cola', 'pepsi', 'nestle', 'tata tea', 'lipton', 'bournvita', 'horlicks', 'red bull', 'sprite', 'fanta', 'thumbs up', 'limca', 'maaza', 'frooti', 'real', 'tropicana', 'minute maid', 'aquafina', 'kinley', 'bisleri', 'himalayan', 'evian'].some(beverage => 
        b.brand.toLowerCase().includes(beverage.toLowerCase()) || b.brand.toLowerCase().replace(/[^a-z0-9]/g, '').includes(beverage.toLowerCase().replace(/[^a-z0-9]/g, ''))
      )
    ),
    "Personal Care": brands.filter(b => 
      ['unilever', 'hindustan', 'colgate', 'johnson', 'gillette', 'nivea', 'dove', 'ponds', 'fair', 'lovely', 'vaseline', 'lux', 'lifebuoy', 'dettol', 'savlon', 'himalaya', 'patanjali', 'dabur', 'emami', 'bajaj'].some(care => 
        b.brand.toLowerCase().includes(care.toLowerCase()) || b.brand.toLowerCase().replace(/[^a-z0-9]/g, '').includes(care.toLowerCase().replace(/[^a-z0-9]/g, ''))
      )
    ),
    "Home Care": brands.filter(b => 
      ['vim', 'surf', 'ariel', 'tide', 'harpic', 'dettol', 'lizol', 'rin', 'wheel', 'ghadi', 'comfort', 'downy', 'vanish', 'colin', 'domex', 'hit', 'good knight', 'mortein', 'all out'].some(home => 
        b.brand.toLowerCase().includes(home.toLowerCase()) || b.brand.toLowerCase().replace(/[^a-z0-9]/g, '').includes(home.toLowerCase().replace(/[^a-z0-9]/g, ''))
      )
    )
  };

  // Premium/Top brands (highest product count)
  const topBrands = [...brands].sort((a, b) => b.productCount - a.productCount).slice(0, 24);
  const trendingBrands = [...brands].sort((a, b) => b.productCount - a.productCount).slice(8, 24);

  const totalBrands = brands.length;
  const totalProducts = brands.reduce((sum, brand) => sum + brand.productCount, 0);

  // Get brands to display based on active tab
  const getBrandsForTab = () => {
    switch (activeTab) {
      case "all-brands":
        return filteredBrands;
      case "top-brands":
        return topBrands.filter(brand => 
          brand.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case "trending":
        return trendingBrands.filter(brand => 
          brand.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case "food-snacks":
        return categorizedBrands["Food & Snacks"].filter(brand => 
          brand.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case "beverages":
        return categorizedBrands["Beverages"].filter(brand => 
          brand.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case "personal-care":
        return categorizedBrands["Personal Care"].filter(brand => 
          brand.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case "home-care":
        return categorizedBrands["Home Care"].filter(brand => 
          brand.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
      default:
        return filteredBrands;
    }
  };

  const brandsToDisplay = getBrandsForTab();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300" data-testid="loading-message">
              Loading our brand portfolio...
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Discovering trusted partners for your business</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5"
          style={{ backgroundImage: `url(${abstractIconsBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-xl">
                <Store className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="brands-hero-title">
              Our Brand Portfolio
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto" data-testid="brands-hero-subtitle">
              Trusted Partners in Food & Beverage Distribution
            </p>
            <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto" data-testid="brands-hero-description">
              Discover our extensive collection of {totalBrands}+ premium brands offering {totalProducts}+ quality products for your business needs.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/products">
                <Button className="px-8 py-4 bg-white text-black hover:bg-gray-100 transition-colors text-lg font-semibold rounded-lg shadow-lg" data-testid="cta-view-all-products">
                  <Package className="h-5 w-5 mr-2" />
                  View All Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="px-8 py-4 bg-accent text-accent-foreground hover:bg-secondary transition-colors text-lg font-semibold rounded-lg shadow-lg border-2 border-white" data-testid="cta-partner-inquiry">
                  <Building className="h-5 w-5 mr-2" />
                  Partnership Inquiry
                </Button>
              </Link>
            </div>
            
            {/* Integrated Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Search brands by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-6 py-4 text-lg text-foreground bg-background rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent border border-border"
                  data-testid="brands-search"
                />
                <Button
                  onClick={handleSearch}
                  className="px-8 py-4 bg-accent text-accent-foreground rounded-r-lg hover:bg-secondary transition-colors border border-l-0 border-border"
                  data-testid="brands-search-button"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900/10 dark:via-blue-900/10 dark:to-indigo-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${groceryShelveBg})` }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="stat-total-brands">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Store className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{totalBrands}+</div>
                <div className="text-blue-700/80 dark:text-blue-300/80 font-medium">Trusted Brands</div>
                <p className="text-sm text-blue-600/70 dark:text-blue-400/70 mt-2">Premium partnerships</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="stat-total-products">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{totalProducts.toLocaleString()}+</div>
                <div className="text-emerald-700/80 dark:text-emerald-300/80 font-medium">Total Products</div>
                <p className="text-sm text-emerald-600/70 dark:text-emerald-400/70 mt-2">Comprehensive catalog</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="stat-categories">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Grid className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">4+</div>
                <div className="text-purple-700/80 dark:text-purple-300/80 font-medium">Major Categories</div>
                <p className="text-sm text-purple-600/70 dark:text-purple-400/70 mt-2">Diverse portfolio</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="stat-quality">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">100%</div>
                <div className="text-amber-700/80 dark:text-amber-300/80 font-medium">Quality Assured</div>
                <p className="text-sm text-amber-600/70 dark:text-amber-400/70 mt-2">Verified partners</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Brand Categories Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-indigo-900/10 dark:via-gray-900 dark:to-cyan-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${productFlatlayBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text" data-testid="categories-title">
              Explore By Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover brands organized by categories to find exactly what your business needs.
            </p>
          </div>

          {/* Category Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" data-testid="brand-categories-tabs">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-4xl grid-cols-3 lg:grid-cols-7 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-2 shadow-lg">
                <TabsTrigger 
                  value="all-brands" 
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
                  data-testid="tab-all-brands"
                >
                  <Grid className="h-4 w-4" />
                  All Brands
                </TabsTrigger>
                <TabsTrigger 
                  value="top-brands" 
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
                  data-testid="tab-top-brands"
                >
                  <Star className="h-4 w-4" />
                  Top Brands
                </TabsTrigger>
                <TabsTrigger 
                  value="trending" 
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
                  data-testid="tab-trending"
                >
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </TabsTrigger>
                <TabsTrigger 
                  value="food-snacks" 
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
                  data-testid="tab-food-snacks"
                >
                  <Coffee className="h-4 w-4" />
                  Food & Snacks
                </TabsTrigger>
                <TabsTrigger 
                  value="beverages" 
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
                  data-testid="tab-beverages"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Beverages
                </TabsTrigger>
                <TabsTrigger 
                  value="personal-care" 
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
                  data-testid="tab-personal-care"
                >
                  <User className="h-4 w-4" />
                  Personal Care
                </TabsTrigger>
                <TabsTrigger 
                  value="home-care" 
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
                  data-testid="tab-home-care"
                >
                  <Home className="h-4 w-4" />
                  Home Care
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Search Results Info */}
            {searchQuery && (
              <div className="text-center mb-8">
                <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" data-testid="search-results-info">
                  <Filter className="h-4 w-4 mr-2" />
                  {brandsToDisplay.length} brands found for "{searchQuery}"
                </Badge>
              </div>
            )}

            {/* Tab Content */}
            <TabsContent value={activeTab} className="mt-0">
              {brandsToDisplay.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Search className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4" data-testid="no-brands-title">
                    No Brands Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto" data-testid="no-brands-message">
                    {searchQuery 
                      ? `No brands found matching "${searchQuery}" in this category. Try adjusting your search or explore other categories.`
                      : "No brands available in this category at the moment. Check back soon for updates to our portfolio."
                    }
                  </p>
                  {searchQuery && (
                    <Button 
                      onClick={() => setSearchQuery("")} 
                      className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      data-testid="clear-search-button"
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6" data-testid="brands-grid">
                  {brandsToDisplay.map((brand) => (
                    <BrandCard
                      key={brand.brand}
                      brand={brand.brand}
                      productCount={brand.productCount}
                      onClick={() => handleBrandClick(brand.brand)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-900/10 dark:via-purple-900/10 dark:to-fuchsia-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${abstractIconsBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 border border-blue-200/50 dark:border-blue-800/50 overflow-hidden" data-testid="cta-partnership-card">
            <CardContent className="p-12 md:p-16 text-center">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                  <Building className="h-12 w-12 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100" data-testid="cta-title">
                Ready to Partner with Leading Brands?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed" data-testid="cta-description">
                Join thousands of successful retailers, restaurants, and institutions who trust Sai Food House 
                for their wholesale distribution needs. Get access to premium brands with competitive pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors text-lg font-semibold rounded-lg shadow-lg" data-testid="cta-get-started">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Get Started Today
                  </Button>
                </Link>
                <Link href="/products">
                  <Button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-lg font-semibold rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700" data-testid="cta-view-catalog">
                    <Package className="h-5 w-5 mr-2" />
                    View Full Catalog
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
