import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import BrandCard from "@/components/brand-card";

export default function Brands() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: brands = [], isLoading } = useQuery<{ brand: string; productCount: number }[]>({
    queryKey: ["/api/brands"],
  });

  const filteredBrands = brands.filter(brand =>
    brand.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBrandClick = (brandName: string) => {
    setLocation(`/products?brand=${encodeURIComponent(brandName)}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="text-lg">Loading brands...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="brands-title">
          Our Brands
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our comprehensive collection of trusted food and beverage brands.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            data-testid="brand-search"
          />
        </div>
      </div>

      {/* Brands Grid */}
      {filteredBrands.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground" data-testid="no-brands-message">
            {searchQuery ? "No brands found matching your search." : "No brands available."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="brands-grid">
          {filteredBrands.map((brand) => (
            <BrandCard
              key={brand.brand}
              brand={brand.brand}
              productCount={brand.productCount}
              onClick={() => handleBrandClick(brand.brand)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
