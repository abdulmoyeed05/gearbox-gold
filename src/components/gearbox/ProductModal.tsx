import { useState } from 'react';
import { X, Minus, Plus, ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
  onBuyNow: (product: Product, qty: number) => void;
}

export function ProductModal({ product, open, onClose, onAddToCart, onBuyNow }: ProductModalProps) {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass border-border/50 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-display tracking-wide">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="h-48 md:h-64 rounded-lg bg-gradient-to-b from-secondary to-background flex items-center justify-center">
            <span className="text-muted-foreground font-mono">{product.sku}</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                {product.category}
              </span>
            </div>
            
            <p className="text-muted-foreground">{product.desc}</p>
            
            <div className="text-3xl font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Quantity:</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQty(Math.min(99, qty + 1))}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Stock: <span className={product.stock > 10 ? 'text-green-500' : 'text-primary'}>{product.stock} units</span>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 gold-gradient text-primary-foreground font-semibold hover:opacity-90"
                onClick={() => {
                  onAddToCart(product, qty);
                  onClose();
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onBuyNow(product, qty);
                }}
              >
                <Zap className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
