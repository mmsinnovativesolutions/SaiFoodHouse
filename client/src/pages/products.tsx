import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { type Product } from "@shared/schema";

export default function Products() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

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

  // Filter products based on search and brand
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = !searchQuery || 
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBrand = !selectedBrand || selectedBrand === "all" ||
      product.brand.toLowerCase() === selectedBrand.toLowerCase();

    return matchesSearch && matchesBrand;
  });

  // Group products by brand
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.brand]) {
      acc[product.brand] = [];
    }
    acc[product.brand].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedBrand("all");
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="text-lg">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="products-title">
          Product Catalog
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our complete collection of food and beverage products organized by brand.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              data-testid="product-search"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-48" data-testid="brand-filter">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.brand} value={brand.brand}>
                    {brand.brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={handleClearFilters}
              data-testid="clear-filters"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products by Brand */}
      {Object.keys(groupedProducts).length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground" data-testid="no-products-message">
            No products found matching your search criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-12" data-testid="products-container">
          {Object.entries(groupedProducts)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([brand, products]) => (
            <div key={brand} className="brand-section" data-testid={`brand-section-${brand.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2 flex items-center" data-testid={`brand-section-title-${brand.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary text-sm font-bold">
                      {brand.charAt(0)}
                    </span>
                  </span>
                  {brand} Products
                </h3>
                <p className="text-muted-foreground" data-testid={`brand-section-description-${brand.toLowerCase().replace(/\s+/g, '-')}`}>
                  {products.length} products available
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
