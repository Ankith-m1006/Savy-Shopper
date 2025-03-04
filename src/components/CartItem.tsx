
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/lib/types";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const { product, quantity } = item;
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(product.id);
    }, 300);
  };

  const price = product.discountedPrice || product.price;
  const totalPrice = price * quantity;

  return (
    <div 
      className={`flex gap-4 py-4 transition-all duration-300 ${
        isRemoving ? "opacity-0 -translate-x-4" : "opacity-100"
      }`}
    >
      <Link to={`/product/${product.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-white">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />
      </Link>
      
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link to={`/product/${product.id}`} className="text-sm font-medium text-primary hover:underline">
            {product.name}
          </Link>
          
          <div className="mt-1 flex items-center text-sm text-muted-foreground">
            <span>${price.toFixed(2)}</span>
            {product.discountedPrice && (
              <span className="ml-2 text-xs line-through">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center border border-input rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none rounded-l-md p-0"
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="flex h-8 w-8 items-center justify-center text-sm">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none rounded-r-md p-0"
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            >
              +
            </Button>
          </div>
          
          <div className="flex items-center">
            <span className="mr-4 text-sm font-medium">${totalPrice.toFixed(2)}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
