import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import Header from "@/components/Header";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    clearCart,
    isAuthenticated,
    user,
  } = useStore();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = async () => {
    if (!isAuthenticated && (!customerName.trim() || !customerPhone.trim())) {
      toast.error("Заполните имя и телефон для оформления заказа");
      return;
    }

    if (cart.length === 0) {
      toast.error("Корзина пуста");
      return;
    }

    setIsSubmitting(true);

    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Заказ успешно оформлен!", {
      description: "Мы свяжемся с вами в ближайшее время",
    });

    clearCart();
    setCustomerName("");
    setCustomerPhone("");
    setIsSubmitting(false);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Корзина пуста
              </h2>
              <p className="text-gray-600 mb-6">Добавьте товары из каталога</p>
              <Button
                onClick={() => navigate("/")}
                className="bg-green-600 hover:bg-green-700"
              >
                Перейти к каталогу
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const total = getCartTotal();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к каталогу
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Товары в корзине ({cart.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => {
                  const price = item.variant?.price || item.product.basePrice;
                  const unit = item.variant?.unit || "шт";

                  return (
                    <div
                      key={`${item.product.id}-${item.variant?.id}`}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        {item.variant && (
                          <p className="text-sm text-gray-600">
                            {item.variant.name}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          {price} ₽/{unit}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.variant?.id,
                              item.quantity - 1,
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="min-w-12 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.variant?.id,
                              item.quantity + 1,
                            )
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">
                          {(price * item.quantity).toLocaleString()} ₽
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeFromCart(item.product.id, item.variant?.id)
                          }
                          className="text-red-600 hover:text-red-700 mt-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Оформление заказа</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isAuthenticated && (
                  <>
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Введите ваше имя"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                    <Separator />
                  </>
                )}

                {isAuthenticated && user && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Заказчик:</strong> {user.name}
                    </p>
                    <p className="text-sm text-green-800">
                      <strong>Телефон:</strong> {user.phone}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Итого:</span>
                    <span>{total.toLocaleString()} ₽</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Оформляем заказ..." : "Оформить заказ"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Нажимая кнопку, вы соглашаетесь с условиями обработки
                  персональных данных
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
