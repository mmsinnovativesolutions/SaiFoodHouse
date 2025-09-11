import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Search, Coffee, Package, ShoppingBag, Award, Clock, Users, Heart, Shield, Star, Truck, Building, HandHeart, Target, Eye, Map, MapPin, Calendar, TrendingUp, Grid, Plus, Store, Utensils, School, Smartphone, Droplets, Cookie, Zap, Beef, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandCard from "@/components/brand-card";
import { type Product } from "@shared/schema";

// Import generated background images
import productFlatlayBg from "@assets/generated_images/Food_beverage_product_flatlay_97becb28.png";
import groceryShelveBg from "@assets/generated_images/Grocery_store_product_shelves_e2e5fcad.png";
import abstractIconsBg from "@assets/generated_images/Abstract_food_beverage_icons_12ad5560.png";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("top-brands");

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

  const handleBrandClick = (brandName: string) => {
    setLocation(`/products?search=${encodeURIComponent(brandName)}`);
  };

  // Sort brands for different tabs
  const topBrands = [...brands].sort((a, b) => b.productCount - a.productCount).slice(0, 12);
  const trendingBrands = [...brands].sort((a, b) => b.productCount - a.productCount).slice(12, 24);
  const newToCatalog = [...brands].sort((a, b) => a.productCount - b.productCount).slice(0, 12);
  
  // Categorize brands for "By Category" tab
  const categorizedBrands = {
    "Food & Snacks": brands.filter(b => 
      ['britannia', 'parle', 'haldiram', 'bikano', 'mtr', 'bambino', 'everest', 'mdh'].some(food => 
        b.brand.toLowerCase().includes(food)
      )
    ).slice(0, 6),
    "Beverages": brands.filter(b => 
      ['coca-cola', 'pepsi', 'nestle', 'tata tea', 'lipton', 'bournvita', 'horlicks', 'red bull'].some(beverage => 
        b.brand.toLowerCase().includes(beverage)
      )
    ).slice(0, 6),
    "Personal Care": brands.filter(b => 
      ['unilever', 'hindustan', 'colgate', 'johnson', 'gillette', 'nivea'].some(care => 
        b.brand.toLowerCase().includes(care)
      )
    ).slice(0, 6),
    "Home Care": brands.filter(b => 
      ['vim', 'surf', 'ariel', 'tide', 'harpic', 'dettol', 'lizol'].some(home => 
        b.brand.toLowerCase().includes(home)
      )
    ).slice(0, 6)
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

      {/* Map Coverage Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-900/10 dark:via-cyan-900/10 dark:to-blue-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${groceryShelveBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent" data-testid="coverage-title">
              Our Reach Across India
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive distribution network spanning multiple states, connecting thousands of retailers and businesses nationwide.
            </p>
          </div>

          {/* Coverage Map Visual */}
          <div className="mb-16">
            <Card className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 border-indigo-200 dark:border-indigo-700 overflow-hidden" data-testid="coverage-map-card">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Map className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
                    Serving Businesses Nationwide
                  </h3>
                </div>
                
                {/* Regional Coverage Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-xl border border-red-200 dark:border-red-800" data-testid="region-north">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-1">Northern India</h4>
                    <p className="text-sm text-red-600/80 dark:text-red-400/80">Delhi, Punjab, Haryana, UP</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200 dark:border-green-800" data-testid="region-west">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-1">Western India</h4>
                    <p className="text-sm text-green-600/80 dark:text-green-400/80">Maharashtra, Gujarat, Rajasthan</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl border border-orange-200 dark:border-orange-800" data-testid="region-south">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-1">Southern India</h4>
                    <p className="text-sm text-orange-600/80 dark:text-orange-400/80">Karnataka, Tamil Nadu, AP</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-xl border border-purple-200 dark:border-purple-800" data-testid="region-east">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-1">Eastern India</h4>
                    <p className="text-sm text-purple-600/80 dark:text-purple-400/80">West Bengal, Odisha, Bihar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coverage Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-cyan-900/20 dark:to-teal-900/20 border-cyan-200 dark:border-cyan-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="stat-states">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Map className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">25+</div>
                <div className="text-cyan-700/80 dark:text-cyan-300/80 font-medium">States Covered</div>
                <p className="text-sm text-cyan-600/70 dark:text-cyan-400/70 mt-2">Expanding coverage across India</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="stat-cities">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
                <div className="text-blue-700/80 dark:text-blue-300/80 font-medium">Cities Served</div>
                <p className="text-sm text-blue-600/70 dark:text-blue-400/70 mt-2">Urban and rural reach</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="stat-partners">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">10,000+</div>
                <div className="text-indigo-700/80 dark:text-indigo-300/80 font-medium">Retail Partners</div>
                <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70 mt-2">Trusted business network</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Journey Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-900/10 dark:via-green-900/10 dark:to-teal-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${productFlatlayBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" data-testid="journey-title">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From a small wholesale operation to India's trusted food & beverage distribution network.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full hidden md:block"></div>
            
            <div className="space-y-12">
              {/* 2015 - Founded */}
              <div className="flex flex-col md:flex-row items-center gap-8" data-testid="milestone-2015">
                <div className="flex-1 md:text-right">
                  <Card className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border-emerald-200 dark:border-emerald-700 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center md:justify-end gap-3 mb-3">
                        <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300">2015</span>
                      </div>
                      <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Founded Sai Food House</h3>
                      <p className="text-emerald-700/80 dark:text-emerald-300/80">Started as a local food distribution business with a vision to serve quality products.</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-800 z-10">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1"></div>
              </div>

              {/* 2017 - Multi-State Expansion */}
              <div className="flex flex-col md:flex-row items-center gap-8" data-testid="milestone-2017">
                <div className="flex-1"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-800 z-10">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 md:text-left">
                  <Card className="bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 border-teal-200 dark:border-teal-700 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        <span className="text-lg font-bold text-teal-700 dark:text-teal-300">2017</span>
                      </div>
                      <h3 className="text-xl font-semibold text-teal-800 dark:text-teal-200 mb-2">Multi-State Expansion</h3>
                      <p className="text-teal-700/80 dark:text-teal-300/80">Expanded operations to 5 states, establishing regional distribution centers.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 2019 - Product Portfolio Growth */}
              <div className="flex flex-col md:flex-row items-center gap-8" data-testid="milestone-2019">
                <div className="flex-1 md:text-right">
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center md:justify-end gap-3 mb-3">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-lg font-bold text-blue-700 dark:text-blue-300">2019</span>
                      </div>
                      <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">1000+ Products Milestone</h3>
                      <p className="text-blue-700/80 dark:text-blue-300/80">Reached 1000+ products across diverse food and beverage categories.</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-800 z-10">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1"></div>
              </div>

              {/* 2021 - Brand Partnership Growth */}
              <div className="flex flex-col md:flex-row items-center gap-8" data-testid="milestone-2021">
                <div className="flex-1"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-800 z-10">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 md:text-left">
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-700 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-lg font-bold text-purple-700 dark:text-purple-300">2021</span>
                      </div>
                      <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-2">500+ Brand Partners</h3>
                      <p className="text-purple-700/80 dark:text-purple-300/80">Achieved partnerships with 500+ trusted brands and manufacturers.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 2024 - Pan-India Presence */}
              <div className="flex flex-col md:flex-row items-center gap-8" data-testid="milestone-2024">
                <div className="flex-1 md:text-right">
                  <Card className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-orange-200 dark:border-orange-700 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center md:justify-end gap-3 mb-3">
                        <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        <span className="text-lg font-bold text-orange-700 dark:text-orange-300">2024</span>
                      </div>
                      <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-2">Pan-India Presence</h3>
                      <p className="text-orange-700/80 dark:text-orange-300/80">Established nationwide distribution network serving 25+ states and 500+ cities.</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-800 z-10">
                  <Map className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Famous Brands Tabs Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 dark:from-rose-900/10 dark:via-orange-900/10 dark:to-yellow-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${abstractIconsBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent" data-testid="famous-brands-title">
              Famous Brands in Our Catalog
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover top-quality products from India's most trusted brands. From household names to emerging favorites, 
              find everything you need for your business.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" data-testid="brands-tabs">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex bg-white dark:bg-gray-800 border shadow-lg rounded-lg p-2 mb-12">
              <TabsTrigger 
                value="top-brands" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
                data-testid="tab-top-brands"
              >
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Top Brands</span>
                <span className="sm:hidden">Top</span>
              </TabsTrigger>
              <TabsTrigger 
                value="trending" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
                data-testid="tab-trending"
              >
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Trending</span>
                <span className="sm:hidden">Trend</span>
              </TabsTrigger>
              <TabsTrigger 
                value="new-catalog" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-green-500 data-[state=active]:text-white"
                data-testid="tab-new-catalog"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New to Catalog</span>
                <span className="sm:hidden">New</span>
              </TabsTrigger>
              <TabsTrigger 
                value="by-category" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                data-testid="tab-by-category"
              >
                <Grid className="h-4 w-4" />
                <span className="hidden sm:inline">By Category</span>
                <span className="sm:hidden">Category</span>
              </TabsTrigger>
            </TabsList>

            {/* Top Brands Tab */}
            <TabsContent value="top-brands" className="mt-8" data-testid="content-top-brands">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-rose-700 dark:text-rose-300 mb-2">Top Performing Brands</h3>
                <p className="text-gray-600 dark:text-gray-400">Brands with the highest product variety and market presence</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {topBrands.map((brand) => (
                  <BrandCard
                    key={brand.brand}
                    brand={brand.brand}
                    productCount={brand.productCount}
                    onClick={() => handleBrandClick(brand.brand)}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Trending Tab */}
            <TabsContent value="trending" className="mt-8" data-testid="content-trending">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-300 mb-2">Trending Brands</h3>
                <p className="text-gray-600 dark:text-gray-400">Popular brands seeing increased demand from retailers</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trendingBrands.map((brand) => (
                  <BrandCard
                    key={brand.brand}
                    brand={brand.brand}
                    productCount={brand.productCount}
                    onClick={() => handleBrandClick(brand.brand)}
                  />
                ))}
              </div>
            </TabsContent>

            {/* New to Catalog Tab */}
            <TabsContent value="new-catalog" className="mt-8" data-testid="content-new-catalog">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mb-2">New to Our Catalog</h3>
                <p className="text-gray-600 dark:text-gray-400">Recently added brands expanding our product portfolio</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {newToCatalog.map((brand) => (
                  <BrandCard
                    key={brand.brand}
                    brand={brand.brand}
                    productCount={brand.productCount}
                    onClick={() => handleBrandClick(brand.brand)}
                  />
                ))}
              </div>
            </TabsContent>

            {/* By Category Tab */}
            <TabsContent value="by-category" className="mt-8" data-testid="content-by-category">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">Brands by Category</h3>
                <p className="text-gray-600 dark:text-gray-400">Explore brands organized by product categories</p>
              </div>
              <div className="space-y-12">
                {Object.entries(categorizedBrands).map(([category, categoryBrands]) => (
                  categoryBrands.length > 0 && (
                    <div key={category} data-testid={`category-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                      <h4 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                        {category}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categoryBrands.map((brand) => (
                          <BrandCard
                            key={brand.brand}
                            brand={brand.brand}
                            productCount={brand.productCount}
                            onClick={() => handleBrandClick(brand.brand)}
                          />
                        ))}
                      </div>
                    </div>
                  )
                ))}
                {Object.values(categorizedBrands).every(cat => cat.length === 0) && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">Categories will be populated as brand data loads...</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-rose-500/10 to-orange-500/10 dark:from-rose-400/10 dark:to-orange-400/10 rounded-2xl p-8 border border-rose-200/50 dark:border-rose-800/50">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Don't See Your Preferred Brand?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                We're constantly expanding our catalog. Contact us to request specific brands or products for your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/brands">
                  <Button className="px-8 py-3 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300" data-testid="cta-view-all-brands">
                    View All Brands
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="px-8 py-3 border-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-semibold rounded-lg transition-all duration-300" data-testid="cta-request-brand">
                    Request a Brand
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Collections Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-900/10 dark:via-yellow-900/10 dark:to-orange-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${productFlatlayBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent" data-testid="category-collections-title">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive product range organized by category. From everyday essentials to premium brands, 
              find exactly what your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tea & Coffee */}
            <Card 
              className="bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200 dark:border-amber-700 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => setLocation('/products?search=tea coffee')}
              data-testid="category-tea-coffee"
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <Coffee className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-amber-800 dark:text-amber-200">Tea & Coffee</h3>
                <p className="text-amber-700/80 dark:text-amber-300/80 leading-relaxed">
                  Premium teas, instant coffee, ground coffee, and hot beverage accessories from trusted brands.
                </p>
              </CardContent>
            </Card>

            {/* Snacks & Biscuits */}
            <Card 
              className="bg-gradient-to-br from-rose-100 to-pink-200 dark:from-rose-900/30 dark:to-pink-900/30 border-rose-200 dark:border-rose-700 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => setLocation('/products?search=snacks biscuits')}
              data-testid="category-snacks-biscuits"
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <Cookie className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-rose-800 dark:text-rose-200">Snacks & Biscuits</h3>
                <p className="text-rose-700/80 dark:text-rose-300/80 leading-relaxed">
                  Cookies, crackers, chips, namkeen, and sweet treats from popular Indian and international brands.
                </p>
              </CardContent>
            </Card>

            {/* Oils & Staples */}
            <Card 
              className="bg-gradient-to-br from-yellow-100 to-amber-200 dark:from-yellow-900/30 dark:to-amber-900/30 border-yellow-200 dark:border-yellow-700 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => setLocation('/products?search=oil staples rice flour')}
              data-testid="category-oils-staples"
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <Droplets className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-800 dark:text-yellow-200">Oils & Staples</h3>
                <p className="text-yellow-700/80 dark:text-yellow-300/80 leading-relaxed">
                  Cooking oils, rice, flour, pulses, and essential kitchen staples for everyday cooking needs.
                </p>
              </CardContent>
            </Card>

            {/* Dairy & Beverages */}
            <Card 
              className="bg-gradient-to-br from-blue-100 to-cyan-200 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-200 dark:border-blue-700 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => setLocation('/products?search=dairy milk beverages drinks')}
              data-testid="category-dairy-beverages"
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <Package className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200">Dairy & Beverages</h3>
                <p className="text-blue-700/80 dark:text-blue-300/80 leading-relaxed">
                  Fresh milk products, yogurt, cheese, juices, soft drinks, and health beverages.
                </p>
              </CardContent>
            </Card>

            {/* Spices & Condiments */}
            <Card 
              className="bg-gradient-to-br from-orange-100 to-red-200 dark:from-orange-900/30 dark:to-red-900/30 border-orange-200 dark:border-orange-700 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => setLocation('/products?search=spices masala condiments sauce')}
              data-testid="category-spices-condiments"
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-orange-800 dark:text-orange-200">Spices & Condiments</h3>
                <p className="text-orange-700/80 dark:text-orange-300/80 leading-relaxed">
                  Aromatic spices, masala powders, sauces, pickles, and flavor enhancers for authentic taste.
                </p>
              </CardContent>
            </Card>

            {/* Personal Care */}
            <Card 
              className="bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-700 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => setLocation('/products?search=personal care hygiene soap')}
              data-testid="category-personal-care"
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-200">Personal Care</h3>
                <p className="text-purple-700/80 dark:text-purple-300/80 leading-relaxed">
                  Soaps, shampoos, toothpaste, skincare products, and hygiene essentials from leading brands.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Category Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-400/10 dark:to-orange-400/10 rounded-2xl p-8 border border-amber-200/50 dark:border-amber-800/50">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Our extensive catalog includes thousands of products across all categories. Use our search or browse all products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300" data-testid="cta-view-all-products">
                    View All Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="px-8 py-3 border-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-semibold rounded-lg transition-all duration-300" data-testid="cta-custom-request">
                    Custom Request
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-indigo-900/10 dark:via-blue-900/10 dark:to-purple-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${groceryShelveBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent" data-testid="industries-served-title">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Trusted by diverse businesses across India. From small retailers to large institutions, 
              we provide tailored wholesale solutions that drive success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Retail Stores */}
            <Card className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-700 hover:shadow-2xl transition-all duration-300 hover:scale-105" data-testid="industry-retail-stores">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Store className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-emerald-800 dark:text-emerald-200">Retail Stores</h3>
                <p className="text-emerald-700/80 dark:text-emerald-300/80 mb-6 leading-relaxed">
                  Neighborhood grocery stores, kirana shops, and specialty retail outlets. We provide competitive pricing, 
                  flexible ordering, and reliable inventory management.
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300" data-testid="cta-retail-partner">
                    Partner with Us
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Supermarkets */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700 hover:shadow-2xl transition-all duration-300 hover:scale-105" data-testid="industry-supermarkets">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Building className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200">Supermarkets</h3>
                <p className="text-blue-700/80 dark:text-blue-300/80 mb-6 leading-relaxed">
                  Large format stores and shopping complexes. We offer bulk supplies, category management support, 
                  and streamlined procurement processes.
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300" data-testid="cta-supermarket-partner">
                    Partner with Us
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Restaurants & Cafes */}
            <Card className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-700 hover:shadow-2xl transition-all duration-300 hover:scale-105" data-testid="industry-restaurants-cafes">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Utensils className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-orange-800 dark:text-orange-200">Restaurants & Cafes</h3>
                <p className="text-orange-700/80 dark:text-orange-300/80 mb-6 leading-relaxed">
                  Food service establishments of all sizes. We supply fresh ingredients, beverages, and kitchen essentials 
                  with quality assurance and timely delivery.
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300" data-testid="cta-restaurant-partner">
                    Partner with Us
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Hotels & Catering */}
            <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-700 hover:shadow-2xl transition-all duration-300 hover:scale-105" data-testid="industry-hotels-catering">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Building className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-200">Hotels & Catering</h3>
                <p className="text-purple-700/80 dark:text-purple-300/80 mb-6 leading-relaxed">
                  Hospitality businesses and catering services. We provide bulk food supplies, premium brands, 
                  and customized solutions for large-scale operations.
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300" data-testid="cta-hotel-partner">
                    Partner with Us
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Institutions */}
            <Card className="bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20 border-teal-200 dark:border-teal-700 hover:shadow-2xl transition-all duration-300 hover:scale-105" data-testid="industry-institutions">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <School className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-teal-800 dark:text-teal-200">Institutions</h3>
                <p className="text-teal-700/80 dark:text-teal-300/80 mb-6 leading-relaxed">
                  Schools, hospitals, offices, and corporate facilities. We offer nutritious food options, 
                  compliance support, and budget-friendly institutional pricing.
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300" data-testid="cta-institution-partner">
                    Partner with Us
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Online Retailers */}
            <Card className="bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-700 hover:shadow-2xl transition-all duration-300 hover:scale-105" data-testid="industry-online-retailers">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Smartphone className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-rose-800 dark:text-rose-200">Online Retailers</h3>
                <p className="text-rose-700/80 dark:text-rose-300/80 mb-6 leading-relaxed">
                  E-commerce platforms and digital retailers. We provide dropshipping support, inventory management, 
                  and API integration for seamless online operations.
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300" data-testid="cta-online-partner">
                    Partner with Us
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Industries Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-400/10 dark:to-purple-400/10 rounded-2xl p-8 md:p-12 border border-indigo-200/50 dark:border-indigo-800/50">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                  <HandHeart className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    Ready to Partner with Us?
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Join thousands of businesses across India who trust Sai Food House for their wholesale needs. 
                    Let's discuss how we can support your business growth with our comprehensive product range and reliable service.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link href="/contact">
                      <Button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300" data-testid="cta-get-started">
                        Get Started Today
                      </Button>
                    </Link>
                    <Link href="/brands">
                      <Button variant="outline" className="px-8 py-4 border-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-semibold rounded-lg transition-all duration-300" data-testid="cta-explore-catalog">
                        Explore Our Catalog
                      </Button>
                    </Link>
                  </div>
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