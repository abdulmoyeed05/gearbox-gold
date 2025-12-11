import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/hooks/useCart';

interface CartSidebarProps {
  cart: CartItem[];
  subtotal: number;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
  onCheckout: () => void;
}

export function CartSidebar({
  cart,
  subtotal,
  onUpdateQty,
  onRemove,
  onClear,
  onCheckout,
}: CartSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      <div className="glass rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-display tracking-wide">YOUR CART</h2>
        </div>

        {cart.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">Your cart is empty</p>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ₹{item.price.toLocaleString()} × {item.qty}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => onUpdateQty(item.id, -1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-6 text-center text-sm">{item.qty}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => onUpdateQty(item.id, 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => onRemove(item.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-border/50 mt-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-2xl font-bold text-primary">₹{subtotal.toLocaleString()}</span>
          </div>
          
          <div className="flex gap-2">
            <Button
              className="flex-1 gold-gradient text-primary-foreground font-semibold hover:opacity-90"
              disabled={cart.length === 0}
              onClick={onCheckout}
            >
              Checkout
            </Button>
            <Button
              variant="outline"
              disabled={cart.length === 0}
              onClick={onClear}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
