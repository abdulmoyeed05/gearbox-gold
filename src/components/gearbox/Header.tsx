import { ShoppingCart, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Header({ cartCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass rounded-xl px-6 py-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
              <Wrench className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl gold-text tracking-wider">GEARBOX PARTS</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 ml-8">
            <a href="#catalog" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Catalog
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Categories
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Deals
            </a>
          </nav>
        </div>
        <Button
          variant="outline"
          className="relative"
          onClick={onCartClick}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full gold-gradient text-primary-foreground text-xs font-bold flex items-center justify-center animate-pulse-gold">
              {cartCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}
