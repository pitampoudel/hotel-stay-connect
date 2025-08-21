import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Shield, Lock } from 'lucide-react';

interface EsewaPaymentProps {
  amount: number;
  productName: string;
  onSuccess: (transactionId: string) => void;
  onCancel: () => void;
}

export const EsewaPayment = ({ amount, productName, onSuccess, onCancel }: EsewaPaymentProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [esewaId, setEsewaId] = useState('');
  const [mpin, setMpin] = useState('');
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!esewaId || !mpin) {
      toast({
        title: "Error",
        description: "Please enter eSewa ID and MPIN",
        variant: "destructive"
      });
      return;
    }

    if (mpin.length !== 4) {
      toast({
        title: "Error", 
        description: "MPIN must be 4 digits",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const transactionId = `ESW${Date.now()}${Math.floor(Math.random() * 1000)}`;
      
      toast({
        title: "Payment Successful",
        description: `Transaction ID: ${transactionId}`,
      });

      onSuccess(transactionId);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
          <img 
            src="https://esewa.com.np/common/images/esewa_logo.png" 
            alt="eSewa"
            className="h-8 w-auto"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <CreditCard className="h-8 w-8 text-green-600 hidden" />
        </div>
        <CardTitle className="text-xl font-semibold">eSewa Payment</CardTitle>
        <p className="text-muted-foreground">Secure payment with eSewa</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Product:</span>
            <span>{productName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Amount:</span>
            <span className="text-lg font-bold text-green-600">Rs. {amount.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="esewaId">eSewa ID</Label>
            <Input
              id="esewaId"
              type="text"
              placeholder="Enter your eSewa ID"
              value={esewaId}
              onChange={(e) => setEsewaId(e.target.value)}
              disabled={isProcessing}
            />
          </div>

          <div>
            <Label htmlFor="mpin">MPIN</Label>
            <Input
              id="mpin"
              type="password"
              placeholder="Enter 4-digit MPIN"
              value={mpin}
              onChange={(e) => setMpin(e.target.value.slice(0, 4))}
              disabled={isProcessing}
              maxLength={4}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>256-bit SSL encryption</span>
          <Lock className="h-4 w-4" />
        </div>

        <div className="space-y-2">
          <Button 
            onClick={handlePayment}
            disabled={isProcessing || !esewaId || !mpin}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Processing Payment...
              </>
            ) : (
              `Pay Rs. ${amount.toLocaleString()}`
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={isProcessing}
            className="w-full"
          >
            Cancel Payment
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          <p>This is a demo simulation of eSewa payment gateway</p>
          <p>Use any eSewa ID and 4-digit MPIN for testing</p>
        </div>
      </CardContent>
    </Card>
  );
};