import { type Product } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow" data-testid={`product-card-${product.id}`}>
      <CardContent className="p-4">
        <div className="mb-3">
          <Badge variant="outline" className="text-xs" data-testid={`product-brand-${product.id}`}>
            {product.brand}
          </Badge>
        </div>
        <h4 className="font-semibold mb-2 text-sm" data-testid={`product-name-${product.id}`}>
          {product.productName}
        </h4>
        <p className="text-muted-foreground text-sm" data-testid={`product-weight-${product.id}`}>
          {product.weightPack}
        </p>
      </CardContent>
    </Card>
  );
}
