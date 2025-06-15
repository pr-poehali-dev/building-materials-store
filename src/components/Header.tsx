import { useState } from "react";
import { ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount, isAuthenticated, user } = useStore();
  const cartCount = getCartCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="https://cdn.poehali.dev/files/29f9d76b-fa8c-48bb-ae31-c5695d845059.png"
              alt="СтройМир - Магазин строительных материалов"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-gray-700 hover:text-green-600"
            >
              Каталог
            </Button>

            {/* Cart Button */}
            <Button
              variant="outline"
              onClick={() => navigate("/cart")}
              className="relative border-green-200 text-green-700 hover:bg-green-50"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 bg-yellow-500 text-black px-1 min-w-5 h-5 flex items-center justify-center text-xs"
                >
                  {cartCount}
                </Badge>
              )}
              <span className="ml-2 hidden sm:inline">Корзина</span>
            </Button>

            {/* Profile Button */}
            <Button
              variant="outline"
              onClick={() => navigate("/auth")}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <User className="h-5 w-5" />
              <span className="ml-2">
                {isAuthenticated ? user?.name : "Войти"}
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                Каталог
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/cart");
                  setMobileMenuOpen(false);
                }}
                className="justify-start relative"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Корзина
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-2 bg-yellow-500 text-black"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/auth");
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                <User className="h-5 w-5 mr-2" />
                {isAuthenticated ? user?.name : "Войти"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
