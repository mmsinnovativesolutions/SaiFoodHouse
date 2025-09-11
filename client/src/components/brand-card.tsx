import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Globe, Cookie, Coffee, Candy } from "lucide-react";

interface BrandCardProps {
  brand: string;
  productCount: number;
  onClick: () => void;
}

const getBrandIcon = (brand: string) => {
  const iconClass = "text-2xl text-primary";
  const iconSize = { size: 32 };
  
  switch (brand.toLowerCase()) {
    case "nestle":
      return <Coffee {...iconSize} className="text-primary" />;
    case "cadbury":
      return <Candy {...iconSize} className="text-primary" />;
    case "britannia":
      return <Cookie {...iconSize} className="text-primary" />;
    case "imported":
      return <Globe {...iconSize} className="text-primary" />;
    default:
      return <Utensils {...iconSize} className="text-primary" />;
  }
};

export default function BrandCard({ brand, productCount, onClick }: BrandCardProps) {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer group" 
      onClick={onClick}
      data-testid={`brand-card-${brand.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
          {getBrandIcon(brand)}
        </div>
        <h3 className="text-lg font-semibold mb-2" data-testid={`brand-name-${brand.toLowerCase().replace(/\s+/g, '-')}`}>
          {brand}
        </h3>
        <p className="text-sm text-muted-foreground" data-testid={`brand-count-${brand.toLowerCase().replace(/\s+/g, '-')}`}>
          {productCount} Products
        </p>
      </CardContent>
    </Card>
  );
}
