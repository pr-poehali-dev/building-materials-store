export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  unit?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  basePrice: number;
  variants?: ProductVariant[];
  description: string;
}

export const products: Product[] = [
  {
    id: "cement",
    name: "Цемент",
    category: "Вяжущие материалы",
    image:
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop",
    basePrice: 350,
    variants: [
      { id: "cement-25", name: "25 кг", price: 350, unit: "мешок" },
      { id: "cement-50", name: "50 кг", price: 680, unit: "мешок" },
    ],
    description: "Портландцемент М400 высокого качества",
  },
  {
    id: "hardware",
    name: "Метизы",
    category: "Крепеж",
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    basePrice: 25,
    variants: [
      { id: "screws", name: "Шурупы универсальные", price: 25, unit: "упак" },
      { id: "bolts", name: "Болты М8х40", price: 45, unit: "упак" },
      { id: "nuts", name: "Гайки М8", price: 35, unit: "упак" },
      { id: "washers", name: "Шайбы М8", price: 20, unit: "упак" },
      { id: "anchors", name: "Анкеры 10х60", price: 120, unit: "упак" },
      { id: "dowels", name: "Дюбели 6х40", price: 30, unit: "упак" },
    ],
    description: "Качественный крепежный материал",
  },
  {
    id: "profile-tube",
    name: "Профтруба",
    category: "Металлопрокат",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
    basePrice: 850,
    variants: [
      { id: "tube-20x20x6", name: "20x20x2мм, 6м", price: 850, unit: "шт" },
      { id: "tube-30x20x6", name: "30x20x2мм, 6м", price: 1200, unit: "шт" },
      { id: "tube-40x20x6", name: "40x20x2мм, 6м", price: 1450, unit: "шт" },
      { id: "tube-50x25x6", name: "50x25x2мм, 6м", price: 1850, unit: "шт" },
      { id: "tube-60x40x6", name: "60x40x3мм, 6м", price: 2650, unit: "шт" },
    ],
    description: "Профильная труба прямоугольного сечения",
  },
  {
    id: "osb",
    name: "OSB-плита",
    category: "Плитные материалы",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    basePrice: 1200,
    variants: [
      { id: "osb-9mm", name: "9мм 1250x2500", price: 1200, unit: "лист" },
      { id: "osb-12mm", name: "12мм 1250x2500", price: 1550, unit: "лист" },
      { id: "osb-15mm", name: "15мм 1250x2500", price: 1850, unit: "лист" },
      { id: "osb-18mm", name: "18мм 1250x2500", price: 2200, unit: "лист" },
      { id: "osb-22mm", name: "22мм 1250x2500", price: 2650, unit: "лист" },
    ],
    description: "Ориентированно-стружечная плита OSB-3",
  },
  {
    id: "insulation",
    name: "Утеплитель",
    category: "Теплоизоляция",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    basePrice: 450,
    variants: [
      { id: "wool-50", name: "Минвата 50мм", price: 450, unit: "упак" },
      { id: "wool-100", name: "Минвата 100мм", price: 850, unit: "упак" },
      { id: "foam-50", name: "Пенопласт 50мм", price: 380, unit: "упак" },
      { id: "foam-100", name: "Пенопласт 100мм", price: 720, unit: "упак" },
    ],
    description: "Теплоизоляционные материалы",
  },
  {
    id: "corrugated",
    name: "Профнастил",
    category: "Кровля и фасад",
    image:
      "https://images.unsplash.com/photo-1558618047-fcd0c47f2e18?w=400&h=300&fit=crop",
    basePrice: 650,
    variants: [
      { id: "corr-green", name: "Зеленый RAL6005", price: 650, unit: "м²" },
      { id: "corr-brown", name: "Коричневый RAL8017", price: 650, unit: "м²" },
      { id: "corr-red", name: "Красный RAL3011", price: 650, unit: "м²" },
      { id: "corr-blue", name: "Синий RAL5005", price: 650, unit: "м²" },
      { id: "corr-gray", name: "Серый RAL7004", price: 620, unit: "м²" },
    ],
    description: "Профилированный лист для кровли и фасада",
  },
];
