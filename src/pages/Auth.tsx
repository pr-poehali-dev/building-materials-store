import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, LogOut } from "lucide-react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import Header from "@/components/Header";

const Auth = () => {
  const navigate = useNavigate();
  const { login, register, logout, isAuthenticated, user } = useStore();

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Register form
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Заполните все поля");
      return;
    }

    setLoginLoading(true);
    try {
      const success = await login(loginEmail, loginPassword);
      if (success) {
        toast.success("Вы успешно вошли в систему!");
        navigate("/");
      } else {
        toast.error("Неверный email или пароль");
      }
    } catch (error) {
      toast.error("Ошибка входа");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !registerName ||
      !registerEmail ||
      !registerPassword ||
      !registerPhone
    ) {
      toast.error("Заполните все поля");
      return;
    }

    setRegisterLoading(true);
    try {
      const success = await register(
        registerName,
        registerEmail,
        registerPassword,
        registerPhone,
      );
      if (success) {
        toast.success("Регистрация прошла успешно!");
        navigate("/");
      } else {
        toast.error("Ошибка регистрации");
      }
    } catch (error) {
      toast.error("Ошибка регистрации");
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Вы вышли из системы");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
        </div>

        {isAuthenticated && user ? (
          // User Profile
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Профиль пользователя</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Имя</Label>
                <Input value={user.name} disabled className="bg-gray-50" />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={user.email || ""}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label>Телефон</Label>
                <Input value={user.phone} disabled className="bg-gray-50" />
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-red-200 text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Auth Forms
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Вход в систему</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Вход</TabsTrigger>
                  <TabsTrigger value="register">Регистрация</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="login-password">Пароль</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Введите пароль"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={loginLoading}
                    >
                      {loginLoading ? "Входим..." : "Войти"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="register-name">Имя</Label>
                      <Input
                        id="register-name"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        placeholder="Введите ваше имя"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="register-phone">Телефон</Label>
                      <Input
                        id="register-phone"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                        placeholder="+7 (999) 123-45-67"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="register-password">Пароль</Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="Создайте пароль"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={registerLoading}
                    >
                      {registerLoading
                        ? "Регистрируем..."
                        : "Зарегистрироваться"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Auth;
