import { type Product } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, Star, Award, Eye, Plus, Coffee, Heart, Cookie, Globe, FileText } from "lucide-react";
import { 
  SiCocacola, 
  SiMcdonalds,
  SiStarbucks,
  SiBurgerking,
  SiApple,
  SiAmazon
} from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  showQuickActions?: boolean;
  compact?: boolean;
}

// Helper function to get category for a product
const getProductCategory = (product: Product): string => {
  const brand = product.brand.toLowerCase();
  const productName = product.productName.toLowerCase();
  
  if (['britannia', 'parle', 'cadbury', 'haldiram', 'bikano'].some(food => brand.includes(food))) {
    return "Food & Snacks";
  }
  if (['coca cola', 'pepsi', 'nestle'].some(beverage => brand.includes(beverage))) {
    return "Beverages";
  }
  if (['veeba', 'kissan', 'maggi'].some(condiment => brand.includes(condiment))) {
    return "Condiments";
  }
  if (brand.includes('imported')) {
    return "Imported";
  }
  if (['abbies', 'organic'].some(health => brand.includes(health) || productName.includes(health))) {
    return "Health & Wellness";
  }
  return "General";
};

// Helper function to get brand icon for a product
const getBrandIcon = (product: Product) => {
  const brand = product.brand.toLowerCase();
  const iconSize = { size: 16 };
  
  switch (brand) {
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
    case "nestle":
      return <Coffee {...iconSize} className="text-red-800" />;
    case "cadbury":
      return <Heart {...iconSize} className="text-purple-600" />;
    case "britannia":
      return <Cookie {...iconSize} className="text-orange-600" />;
    case "imported":
      return <Globe {...iconSize} className="text-blue-600" />;
    default:
      return <Award {...iconSize} className="text-primary" />;
  }
};

// Helper function to get brand color theme
const getBrandGradient = (product: Product): string => {
  const brand = product.brand.toLowerCase();
  if (brand.includes('coca cola') || brand.includes('nestle')) {
    return "from-red-100 to-rose-200 dark:from-red-900/20 dark:to-rose-900/20";
  }
  if (brand.includes('britannia') || brand.includes('parle')) {
    return "from-orange-100 to-amber-200 dark:from-orange-900/20 dark:to-amber-900/20";
  }
  if (brand.includes('cadbury')) {
    return "from-purple-100 to-violet-200 dark:from-purple-900/20 dark:to-violet-900/20";
  }
  if (brand.includes('veeba')) {
    return "from-green-100 to-emerald-200 dark:from-green-900/20 dark:to-emerald-900/20";
  }
  if (brand.includes('imported')) {
    return "from-blue-100 to-indigo-200 dark:from-blue-900/20 dark:to-indigo-900/20";
  }
  return "from-slate-100 to-gray-200 dark:from-slate-800/20 dark:to-gray-800/20";
};

export default function ProductCard({ product, showQuickActions = true, compact = false }: ProductCardProps) {
  const category = getProductCategory(product);
  const brandGradient = getBrandGradient(product);
  const { toast } = useToast();

  const handleViewDetails = () => {
    toast({
      title: "Product Details",
      description: `Viewing details for ${product.productName} from ${product.brand}. Weight/Pack: ${product.weightPack}`,
    });
  };

  if (compact) {
    return (
      <Card 
        className="border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900" 
        data-testid={`product-card-${product.id}`}
      >
        <CardContent className="p-3">
          <div className="flex items-start justify-between mb-2">
            <Badge 
              variant="secondary" 
              className={`text-xs bg-gradient-to-r ${brandGradient} text-gray-700 dark:text-gray-200 border-0 font-medium`}
              data-testid={`product-brand-${product.id}`}
            >
              {product.brand}
            </Badge>
            <div>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                <Eye className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <h4 className="font-semibold mb-1 text-sm leading-tight line-clamp-2" data-testid={`product-name-${product.id}`}>
            {product.productName}
          </h4>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs flex items-center" data-testid={`product-weight-${product.id}`}>
              <Package className="h-3 w-3 mr-1" />
              {product.weightPack}
            </p>
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={`border-0 overflow-hidden bg-gradient-to-br ${brandGradient} relative`}
      data-testid={`product-card-${product.id}`}
    >
      <CardContent className="p-0 relative z-10">
        {/* Card Header with Brand */}
        <div className="bg-gradient-to-r from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-800/60 backdrop-blur-sm p-4 border-b border-white/50 dark:border-slate-700/50">
          <div className="flex items-start justify-between mb-3">
            <Badge 
              className="bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-200 dark:to-slate-100 text-white dark:text-slate-800 border-0 font-semibold shadow-lg"
              data-testid={`product-brand-${product.id}`}
            >
              <span className="mr-1">{getBrandIcon(product)}</span>
              {product.brand}
            </Badge>
            <Badge 
              variant="secondary" 
              className="text-xs bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-600/30"
              data-testid={`product-category-${product.id}`}
            >
              {category}
            </Badge>
          </div>
          
          <h4 className="font-bold text-lg leading-tight mb-2 text-slate-800 dark:text-slate-100 line-clamp-2" data-testid={`product-name-${product.id}`}>
            {product.productName}
          </h4>
          
          <div className="flex items-center text-muted-foreground">
            <Package className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium" data-testid={`product-weight-${product.id}`}>
              {product.weightPack}
            </span>
          </div>
        </div>

        {/* Card Footer with Actions */}
        {showQuickActions && (
          <div className="p-4 bg-gradient-to-t from-white/90 to-white/70 dark:from-slate-900/90 dark:to-slate-800/70 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleViewDetails}
                className="px-6 bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-600 font-semibold"
                data-testid={`product-view-details-${product.id}`}
              >
                <FileText className="h-4 w-4 mr-1" />
                Details
              </Button>
            </div>
            
            {/* Additional Info Row */}
            <div className="flex items-center justify-center mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-600/60">
              <div className="flex items-center text-xs text-muted-foreground">
                <Star className="h-3 w-3 mr-1 text-amber-500" />
                <span>Wholesale Available</span>
              </div>
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
}

// Export a simplified version for list view
export function ProductCardList({ product }: { product: Product }) {
  const category = getProductCategory(product);
  const brandGradient = getBrandGradient(product);
  const { toast } = useToast();

  const handleViewDetails = () => {
    toast({
      title: "Product Details",
      description: `Viewing details for ${product.productName} from ${product.brand}. Weight/Pack: ${product.weightPack}`,
    });
  };

  return (
    <Card 
      className={`border-0 bg-gradient-to-r ${brandGradient}`}
      data-testid={`product-list-card-${product.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge 
                className="bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 border-0 font-semibold"
                data-testid={`product-list-brand-${product.id}`}
              >
                <span className="mr-1">{getBrandIcon(product)}</span>
                {product.brand}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            </div>
            <h4 className="font-bold text-lg mb-1 text-slate-800 dark:text-slate-100" data-testid={`product-list-name-${product.id}`}>
              {product.productName}
            </h4>
            <div className="flex items-center text-muted-foreground">
              <Package className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm font-medium" data-testid={`product-list-weight-${product.id}`}>
                {product.weightPack}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleViewDetails}
              className="bg-white/80"
              data-testid={`product-list-details-${product.id}`}
            >
              <FileText className="h-4 w-4 mr-1" />
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}