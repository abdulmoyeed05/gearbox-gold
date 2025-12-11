import { Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onView: () => void;
  index: number;
}

export function ProductCard({ product, onAddToCart, onView, index }: ProductCardProps) {
  return (
    <div
      className="glass rounded-xl p-4 card-hover opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="h-32 rounded-lg bg-gradient-to-b from-secondary to-background flex items-center justify-center mb-4">
        <span className="text-muted-foreground text-sm font-mono">{product.sku}</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground leading-tight">{product.name}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground whitespace-nowrap">
            {product.category}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{product.desc}</p>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={onView}>
              <Eye className="w-4 h-4" />
            </Button>
            <Button size="icon" onClick={onAddToCart}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
