import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { Search, X, Filter, Grid3X3, List, Package, Star, TrendingUp, ChevronDown, ArrowUpDown, FileText, Phone, ShoppingCart, Eye, Users, Building, Award, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/product-card";
import { type Product } from "@shared/schema";

// Import generated background images
import productFlatlayBg from "@assets/generated_images/Food_beverage_product_flatlay_97becb28.png";
import groceryShelveBg from "@assets/generated_images/Grocery_store_product_shelves_e2e5fcad.png";
import abstractIconsBg from "@assets/generated_images/Abstract_food_beverage_icons_12ad5560.png";

export default function Products() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("all-products");

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const urlSearch = params.get('search') || '';
    const urlBrand = params.get('brand') || 'all';
    
    setSearchQuery(urlSearch);
    setSelectedBrand(urlBrand);
  }, [location]);

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: brands = [] } = useQuery<{ brand: string; productCount: number }[]>({
    queryKey: ["/api/brands"],
  });

  // Enhanced product categorization
  const productCategories = {
    "Food & Snacks": allProducts.filter(p => 
      ['britannia', 'parle', 'haldiram', 'bikano', 'mtr', 'bambino', 'everest', 'mdh', 'cadbury'].some(food => 
        p.brand.toLowerCase().includes(food)
      )
    ),
    "Beverages": allProducts.filter(p => 
      ['coca cola', 'pepsi', 'nestle', 'tata tea', 'lipton', 'bournvita', 'horlicks', 'red bull'].some(beverage => 
        p.brand.toLowerCase().includes(beverage)
      )
    ),
    "Condiments & Sauces": allProducts.filter(p => 
      ['veeba', 'kissan', 'maggi', 'knorr'].some(condiment => 
        p.brand.toLowerCase().includes(condiment)
      )
    ),
    "Imported Specialties": allProducts.filter(p => 
      p.brand.toLowerCase().includes('imported')
    ),
    "Health & Wellness": allProducts.filter(p => 
      ['abbies', 'organic', 'health', 'nutrition'].some(health => 
        p.brand.toLowerCase().includes(health) || p.productName.toLowerCase().includes(health)
      )
    )
  };

  const totalProducts = allProducts.length;
  const totalBrands = brands.length;
  const totalCategories = Object.keys(productCategories).length;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const newUrl = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      setLocation(newUrl);
    } else {
      setLocation('/products');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Enhanced filtering logic
  const getFilteredProducts = () => {
    let filtered = [...allProducts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Brand filter
    if (selectedBrand && selectedBrand !== "all") {
      filtered = filtered.filter(product => 
        product.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      const categoryProducts = productCategories[selectedCategory as keyof typeof productCategories] || [];
      const categoryProductIds = categoryProducts.map(p => p.id);
      filtered = filtered.filter(product => categoryProductIds.includes(product.id));
    }

    // Sort products
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "brand":
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case "weight":
        filtered.sort((a, b) => a.weightPack.localeCompare(b.weightPack));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Group products by brand for brand view
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.brand]) {
      acc[product.brand] = [];
    }
    acc[product.brand].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Group by categories for category view
  const getProductsByCategory = () => {
    const result: Record<string, Product[]> = {};
    Object.entries(productCategories).forEach(([category, products]) => {
      const filtered = products.filter(product => {
        const matchesSearch = !searchQuery || 
          product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBrand = !selectedBrand || selectedBrand === "all" ||
          product.brand.toLowerCase() === selectedBrand.toLowerCase();
        return matchesSearch && matchesBrand;
      });
      if (filtered.length > 0) {
        result[category] = filtered;
      }
    });
    return result;
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedBrand("all");
    setSelectedCategory("all");
    setSortBy("name");
    setLocation('/products');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedBrand && selectedBrand !== "all") count++;
    if (selectedCategory && selectedCategory !== "all") count++;
    return count;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        {/* Hero Skeleton */}
        <section className="hero-gradient text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center animate-pulse">
              <div className="h-12 bg-white/20 rounded-lg mb-6 max-w-md mx-auto"></div>
              <div className="h-6 bg-white/10 rounded mb-4 max-w-2xl mx-auto"></div>
              <div className="h-4 bg-white/10 rounded mb-8 max-w-lg mx-auto"></div>
            </div>
          </div>
        </section>
        
        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-3"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Enhanced Hero Section */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5"
          style={{ backgroundImage: `url(${productFlatlayBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text" data-testid="products-hero-title">
              Our Product Range
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto" data-testid="products-hero-subtitle">
              Discover Sai Food House's Comprehensive Product Catalog
            </p>
            <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto" data-testid="products-hero-description">
              From premium food products to refreshing beverages - explore our extensive range of quality items from trusted brands across India.
            </p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300" data-testid="stat-products">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{totalProducts}+</div>
                  <div className="text-sm opacity-80">Total Products</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300" data-testid="stat-brands">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{totalBrands}+</div>
                  <div className="text-sm opacity-80">Trusted Brands</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300" data-testid="stat-categories">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Grid3X3 className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{totalCategories}+</div>
                  <div className="text-sm opacity-80">Product Categories</div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/contact">
                <Button className="px-8 py-4 bg-white text-black hover:bg-gray-100 transition-colors text-lg font-semibold rounded-lg shadow-lg" data-testid="cta-request-catalog">
                  <FileText className="mr-2 h-5 w-5" />
                  Request Catalog
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="px-8 py-4 bg-accent text-accent-foreground hover:bg-secondary transition-colors text-lg font-semibold rounded-lg shadow-lg border-2 border-white" data-testid="cta-bulk-enquiry">
                  <Phone className="mr-2 h-5 w-5" />
                  Bulk Enquiry
                </Button>
              </Link>
            </div>

            {/* Integrated Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search products, brands, or categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-4 py-4 text-lg text-foreground bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-border"
                      data-testid="hero-search"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSearch}
                  className="px-8 py-4 bg-accent text-accent-foreground rounded-lg hover:bg-secondary transition-colors border border-border text-lg font-semibold"
                  data-testid="hero-search-button"
                >
                  Search Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filters Section */}
      <section className="py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-8 border">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2" data-testid="filters-title">
                  Filter & Sort Products
                </h2>
                <p className="text-muted-foreground">
                  {filteredProducts.length} products found {getActiveFiltersCount() > 0 && `with ${getActiveFiltersCount()} active filter${getActiveFiltersCount() > 1 ? 's' : ''}`}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  data-testid="view-grid"
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  data-testid="view-list"
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger data-testid="category-filter">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {Object.entries(productCategories).map(([category, products]) => (
                      <SelectItem key={category} value={category}>
                        {category} ({products.length})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Brand</label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger data-testid="brand-filter">
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand.brand} value={brand.brand}>
                        {brand.brand} ({brand.productCount})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger data-testid="sort-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Product Name
                    </SelectItem>
                    <SelectItem value="brand">
                      <Award className="h-4 w-4 mr-2" />
                      Brand Name
                    </SelectItem>
                    <SelectItem value="weight">
                      <Package className="h-4 w-4 mr-2" />
                      Weight/Pack Size
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="w-full"
                  data-testid="clear-filters"
                  disabled={getActiveFiltersCount() === 0}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {getActiveFiltersCount() > 0 && (
              <div className="flex flex-wrap gap-2" data-testid="active-filters">
                {searchQuery && (
                  <Badge variant="secondary" className="text-sm">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="ml-2 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedBrand && selectedBrand !== "all" && (
                  <Badge variant="secondary" className="text-sm">
                    Brand: {selectedBrand}
                    <button onClick={() => setSelectedBrand("all")} className="ml-2 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedCategory && selectedCategory !== "all" && (
                  <Badge variant="secondary" className="text-sm">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory("all")} className="ml-2 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Products Display */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${groceryShelveBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* View Toggle Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="all-products" data-testid="tab-all-products">
                <Grid3X3 className="h-4 w-4 mr-2" />
                All Products
              </TabsTrigger>
              <TabsTrigger value="by-category" data-testid="tab-by-category">
                <Filter className="h-4 w-4 mr-2" />
                By Category
              </TabsTrigger>
            </TabsList>

            {/* All Products View */}
            <TabsContent value="all-products">
              {Object.keys(groupedProducts).length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4" data-testid="no-products-title">
                    No products found
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto" data-testid="no-products-message">
                    We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button onClick={handleClearFilters} data-testid="no-products-clear-button">
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-16" data-testid="products-container">
                  {Object.entries(groupedProducts)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([brand, products]) => (
                    <div key={brand} className="brand-section" data-testid={`brand-section-${brand.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                              <span className="text-2xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {brand.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold mb-2" data-testid={`brand-section-title-${brand.toLowerCase().replace(/\s+/g, '-')}`}>
                                {brand} Products
                              </h3>
                              <p className="text-muted-foreground flex items-center" data-testid={`brand-section-description-${brand.toLowerCase().replace(/\s+/g, '-')}`}>
                                <Package className="h-4 w-4 mr-2" />
                                {products.length} products available
                              </p>
                            </div>
                          </div>
                          <Link href={`/products?brand=${encodeURIComponent(brand)}`}>
                            <Button variant="outline" size="sm" data-testid={`view-all-${brand.toLowerCase().replace(/\s+/g, '-')}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View All
                            </Button>
                          </Link>
                        </div>
                        
                        <div className={viewMode === "grid" 
                          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                          : "space-y-4"
                        }>
                          {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* By Category View */}
            <TabsContent value="by-category">
              <div className="space-y-16" data-testid="categories-container">
                {Object.entries(getProductsByCategory()).map(([category, products]) => (
                  <div key={category} className="category-section" data-testid={`category-section-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                            <Star className="h-8 w-8 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold mb-2" data-testid={`category-section-title-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                              {category}
                            </h3>
                            <p className="text-muted-foreground flex items-center" data-testid={`category-section-description-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                              <Package className="h-4 w-4 mr-2" />
                              {products.length} products in this category
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedCategory(category)}
                          data-testid={`filter-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <Filter className="h-4 w-4 mr-2" />
                          Filter by Category
                        </Button>
                      </div>
                      
                      <div className={viewMode === "grid" 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        : "space-y-4"
                      }>
                        {products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-pink-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${abstractIconsBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <ShoppingCart className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="cta-title">
            Ready to Order?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="cta-description">
            Get in touch with our team for bulk orders, custom requirements, or detailed product information. 
            We're here to help your business succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-semibold rounded-lg shadow-lg" data-testid="cta-contact">
                <Phone className="mr-2 h-5 w-5" />
                Contact Our Team
              </Button>
            </Link>
            <Link href="/brands">
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold rounded-lg border-2" data-testid="cta-explore-brands">
                <Building className="mr-2 h-5 w-5" />
                Explore All Brands
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}