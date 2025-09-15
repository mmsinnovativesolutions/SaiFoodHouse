import { Card, CardContent } from "@/components/ui/card";
import { 
  SiCocacola, 
  SiMcdonalds,
  SiStarbucks,
  SiBurgerking,
  SiApple,
  SiAmazon,
  SiGoogle
} from "react-icons/si";
import { Package, ShoppingBag, Award, Sparkles, Coffee, Cookie, Globe, Heart, Utensils } from "lucide-react";

interface BrandCardProps {
  brand: string;
  productCount: number;
  onClick: () => void;
}

const getBrandIcon = (brand: string) => {
  const iconSize = { size: 32 };
  
  switch (brand.toLowerCase()) {
    case "coca cola":
    case "cocacola":
      return <SiCocacola {...iconSize} className="text-red-600" />;
    case "mcdonalds":
    case "mcdonald's":
      return <SiMcdonalds {...iconSize} className="text-yellow-500" />;
    case "starbucks":
      return <SiStarbucks {...iconSize} className="text-green-700" />;
    case "burger king":
    case "burgerking":
      return <SiBurgerking {...iconSize} className="text-orange-600" />;
    case "apple":
      return <SiApple {...iconSize} className="text-gray-800 dark:text-gray-200" />;
    case "amazon":
      return <SiAmazon {...iconSize} className="text-orange-500" />;
    case "google":
      return <SiGoogle {...iconSize} className="text-blue-500" />;
    case "nestle":
      return <Coffee {...iconSize} className="text-red-800" />;
    case "cadbury":
      return <Heart {...iconSize} className="text-purple-600" />;
    case "britannia":
      return <Cookie {...iconSize} className="text-orange-600" />;
    case "imported":
      return <Globe {...iconSize} className="text-blue-600" />;
    case "amul":
      return <Package {...iconSize} className="text-blue-700" />;
    case "veeba":
      return <Sparkles {...iconSize} className="text-green-600" />;
    default:
      return <ShoppingBag {...iconSize} className="text-primary" />;
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
