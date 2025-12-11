import { useState } from 'react';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CartItem } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  onOrderComplete: () => void;
}

const SHIPPING = 99;

export function CheckoutModal({ open, onClose, cart, subtotal, onOrderComplete }: CheckoutModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const total = subtotal + SHIPPING;

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.address) {
      toast({ title: 'Missing Info', description: 'Please fill in all customer details', variant: 'destructive' });
      return;
    }
    if (!form.cardNumber || !form.expiry || !form.cvc) {
      toast({ title: 'Missing Payment', description: 'Please fill in payment details', variant: 'destructive' });
      return;
    }
    if (form.cardNumber.replace(/\s/g, '').length < 12) {
      toast({ title: 'Invalid Card', description: 'Please enter a valid card number', variant: 'destructive' });
      return;
    }

    setLoading(true);
    
    // Simulate checkout
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const orderId = 'ORD' + Date.now();
    const txnId = 'TXN' + Math.floor(Math.random() * 1000000);
    
    toast({
      title: 'Order Placed!',
      description: `Order ${orderId} confirmed. Transaction: ${txnId}`,
    });
    
    setLoading(false);
    onOrderComplete();
    onClose();
    setForm({ name: '', email: '', address: '', cardNumber: '', expiry: '', cvc: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass border-border/50 max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display tracking-wide flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary" />
            CHECKOUT
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-[1fr,280px] gap-6 mt-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" /> Shipping Details
              </h3>
              <div className="space-y-3">
                <Input
                  placeholder="Full Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="bg-secondary/50"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="bg-secondary/50"
                />
                <Textarea
                  placeholder="Shipping Address"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  className="bg-secondary/50"
                  rows={3}
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" /> Payment
              </h3>
              <div className="space-y-3">
                <Input
                  placeholder="Card Number (e.g., 4242 4242 4242 4242)"
                  value={form.cardNumber}
                  onChange={e => setForm({ ...form, cardNumber: e.target.value })}
                  className="bg-secondary/50"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={e => setForm({ ...form, expiry: e.target.value })}
                    className="bg-secondary/50"
                  />
                  <Input
                    placeholder="CVC"
                    value={form.cvc}
                    onChange={e => setForm({ ...form, cvc: e.target.value })}
                    className="bg-secondary/50"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-lg p-4 h-fit">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            
            <div className="space-y-2 text-sm max-h-32 overflow-y-auto mb-3">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-muted-foreground truncate">{item.name} ×{item.qty}</span>
                  <span>₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border/50 pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>₹{SHIPPING}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border/50">
                <span>Total</span>
                <span className="text-primary">₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <Button
              className="w-full mt-4 gold-gradient text-primary-foreground font-semibold hover:opacity-90"
              disabled={loading || cart.length === 0}
              onClick={handleSubmit}
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Place Order
                </>
              )}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center mt-2">
              Demo only - no real payment
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
