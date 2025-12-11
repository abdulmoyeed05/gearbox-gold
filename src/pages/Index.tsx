import { useState } from 'react';
import { Header } from '@/components/gearbox/Header';
import { ProductCard } from '@/components/gearbox/ProductCard';
import { CartSidebar } from '@/components/gearbox/CartSidebar';
import { ProductModal } from '@/components/gearbox/ProductModal';
import { CheckoutModal } from '@/components/gearbox/CheckoutModal';
import { products, Product } from '@/data/products';
import { useCart } from '@/hooks/useCart';

const Index = () => {
  const { cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, subtotal } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleBuyNow = (product: Product, qty: number) => {
    addToCart(product, qty);
    setSelectedProduct(null);
    setShowCheckout(true);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <Header cartCount={cartCount} onCartClick={() => setShowCheckout(true)} />
        
        <div className="grid lg:grid-cols-[1fr,320px] gap-6">
          <main id="catalog">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl md:text-4xl font-display tracking-wide gold-text">
                FEATURED CAR PARTS
              </h2>
              <span className="text-muted-foreground text-sm">{products.length} products</span>
            </div>
            
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={() => addToCart(product, 1)}
                  onView={() => setSelectedProduct(product)}
                />
              ))}
            </div>
            
            <footer className="mt-12 pt-6 border-t border-border/50 text-center text-muted-foreground text-sm">
              <p>© {new Date().getFullYear()} GearBox Parts — Demo Store</p>
              <p className="mt-1">Premium automotive parts for every vehicle</p>
            </footer>
          </main>
          
          <CartSidebar
            cart={cart}
            subtotal={subtotal}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
            onClear={clearCart}
            onCheckout={() => setShowCheckout(true)}
          />
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        onBuyNow={handleBuyNow}
      />

      <CheckoutModal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        cart={cart}
        subtotal={subtotal}
        onOrderComplete={clearCart}
      />
    </div>
  );
};

export default Index;
