import { 
  createRootRoute, 
  createRoute, 
  createRouter, 
  Outlet, 
  ScrollRestoration 
} from '@tanstack/react-router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toaster } from 'react-hot-toast';

// Layout component
const Root = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-orange-200">
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
      <ScrollRestoration />
    </div>
  );
};

// Route Definitions
export const rootRoute = createRootRoute({
  component: Root,
});

import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfilePage } from './pages/ProfilePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmedPage } from './pages/OrderConfirmedPage';
import { OrderListPage } from './pages/OrderListPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

// Route Definitions
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductListingPage,
});

export const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/$id',
  component: ProductDetailPage,
});

export const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
});

export const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wishlist',
  component: WishlistPage,
});

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

export const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignupPage,
});

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
});

export const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
});

export const orderConfirmedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order-confirmed',
  component: OrderConfirmedPage,
});

export const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: OrderListPage,
});

export const orderTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders/$id',
  component: OrderTrackingPage,
});

export const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forgot-password',
  component: ForgotPasswordPage,
});

// Create Route Tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
  cartRoute,
  wishlistRoute,
  loginRoute,
  signupRoute,
  profileRoute,
  checkoutRoute,
  orderConfirmedRoute,
  ordersRoute,
  orderTrackingRoute,
  forgotPasswordRoute,
]);

// Create Router
export const router = createRouter({ routeTree });

// Type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
