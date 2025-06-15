import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Качественные строительные материалы
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Широкий ассортимент стройматериалов по выгодным ценам. Быстрая
            доставка и профессиональная консультация для ваших проектов.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Быстрая доставка
            </h3>
            <p className="text-gray-600">
              Доставляем заказы в течение 1-2 дней по городу
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border border-green-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Гарантия качества
            </h3>
            <p className="text-gray-600">
              Все материалы сертифицированы и проверены
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Консультации
            </h3>
            <p className="text-gray-600">Поможем выбрать нужные материалы</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
