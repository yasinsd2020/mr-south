import { Product, Review } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Stealth Bomber Hoodie',
    description: 'Premium heavyweight cotton hoodie with a semi-slouchy fit and tactical aesthetic.',
    price: 129,
    discountPrice: 99,
    category: 'Hoodies',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Dark Gray'],
    rating: 4.8,
    reviewsCount: 124,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: '2',
    name: 'Midnight Runner Sneakers',
    description: 'High-performance urban sneakers with responsive cushioning and a sleek carbon-fiber look.',
    price: 189,
    category: 'Shoes',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'],
    sizes: ['8', '9', '10', '11'],
    colors: ['Black', 'Neon Orange'],
    rating: 4.9,
    reviewsCount: 256,
    isFeatured: true,
    isNewArrival: true,
  },
  {
    id: '3',
    name: 'Gold Horizon Chrono',
    description: 'A masterpiece of Swiss engineering with a luxury gold finish and stainless steel strap.',
    price: 450,
    category: 'Watches',
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800'],
    sizes: ['One Size'],
    colors: ['Gold', 'Silver'],
    rating: 5.0,
    reviewsCount: 42,
    isBestSeller: true,
  },
  {
    id: '4',
    name: 'Nomad Tech Jacket',
    description: 'Weatherproof shell jacket designed for the modern explorer. Minimalist design meets extreme durability.',
    price: 299,
    discountPrice: 249,
    category: 'Jackets',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Olive', 'Midnight Blue'],
    rating: 4.7,
    reviewsCount: 89,
    isTrending: true,
  },
  {
    id: '5',
    name: 'Elements Basic Tee',
    description: 'The perfect essential. 100% organic pima cotton with a refined tailored cut.',
    price: 45,
    category: 'T-Shirts',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Heather Gray'],
    rating: 4.6,
    reviewsCount: 512,
    isBestSeller: true,
  },
  {
    id: '6',
    name: 'Urban Cargo Joggers',
    description: 'Utility meets comfort. Tapered joggers with multiple secure pockets and stretch-kit fabric.',
    price: 110,
    category: 'Pants',
    images: ['https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'],
    sizes: ['28', '30', '32', '34'],
    colors: ['Charcoal', 'Khaki'],
    rating: 4.5,
    reviewsCount: 167,
    isNewArrival: true,
  }
];

export const productService = {
  getProducts: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_PRODUCTS;
  },
  getProductById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_PRODUCTS.find(p => p.id === id) || null;
  },
  getReviews: async (productId: string): Promise<Review[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      { id: 'r1', userId: 'u1', userName: 'Alex Johnson', rating: 5, comment: 'Incredible quality. Better than expected!', date: '2024-03-15' },
      { id: 'r2', userId: 'u2', userName: 'Sarah Miller', rating: 4, comment: 'Great fit, very stylish.', date: '2024-03-10' },
    ];
  }
};
