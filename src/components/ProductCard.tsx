import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Product, ProductVariant } from "@/lib/products";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(product.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useStore();

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    toast.success(`${product.name} добавлен в корзину!`, {
      description: selectedVariant
        ? `${selectedVariant.name} - ${quantity} шт.`
        : `${quantity} шт.`,
    });
    setQuantity(1);
  };

  const currentPrice = selectedVariant?.price || product.basePrice;
  const unit = selectedVariant?.unit || "шт";

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 border-green-100">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
          />
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 bg-green-100 text-green-800"
          >
            {product.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </CardTitle>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>

        {/* Variant Selection */}
        {product.variants && product.variants.length > 1 && (
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Выберите вариант:
            </label>
            <Select
              value={selectedVariant?.id}
              onValueChange={(value) => {
                const variant = product.variants?.find((v) => v.id === value);
                setSelectedVariant(variant);
              }}
            >
              <SelectTrigger className="border-green-200 focus:border-green-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {product.variants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{variant.name}</span>
                      <span className="ml-4 font-medium">
                        {variant.price} ₽/{variant.unit || "шт"}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Quantity Selection */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Количество:
          </label>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="min-w-12 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {(currentPrice * quantity).toLocaleString()} ₽
            </span>
            <div className="text-sm text-gray-600">
              {currentPrice} ₽/{unit}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
