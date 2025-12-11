import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const CART_KEY = 'gearbox_cart_v1';

function loadCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(loadCart());
  }, []);

  const addToCart = useCallback((product: Product, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      let newCart: CartItem[];
      if (existing) {
        newCart = prev.map(item =>
          item.id === product.id
            ? { ...item, qty: Math.min(item.qty + qty, 99) }
            : item
        );
      } else {
        newCart = [...prev, { id: product.id, name: product.name, price: product.price, qty }];
      }
      saveCart(newCart);
      return newCart;
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== id);
      saveCart(newCart);
      return newCart;
    });
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    setCart(prev => {
      const newCart = prev.map(item =>
        item.id === id
          ? { ...item, qty: Math.max(1, Math.min(item.qty + delta, 99)) }
          : item
      ).filter(item => item.qty > 0);
      saveCart(newCart);
      return newCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    saveCart([]);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartCount,
    subtotal,
  };
}
