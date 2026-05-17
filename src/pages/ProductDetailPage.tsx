import { useParams, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/api";
import { Button } from "../components/ui/Button";
import { formatPrice } from "../lib/utils";
import { useCartStore, useWishlistStore } from "../store/useStore";
import { useEffect, useState } from "react";
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
  Plus,
  Minus,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "react-hot-toast";
import { ProductCard } from "../components/ProductCard";

export function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProductById(id),
  });

  const { data: allProducts } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => productService.getReviews(id),
    enabled: !!product,
  });

  const addItem = useCartStore((state) => state.addItem);
  const { wishlist, toggleWishlist } = useWishlistStore();
  const isWishlisted = wishlist.includes(id);

  useEffect(() => {
    if (!product) return;

    if (product.sizes.length > 0 && !selectedSize) {
      const smallSize =
        product.sizes.find((size) => size.toLowerCase() === "s") ||
        product.sizes.find((size) => size.toLowerCase() === "small") ||
        product.sizes[0];
      setSelectedSize(smallSize);
    }

    if (product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
  }, [product, selectedSize, selectedColor]);

  const relatedProducts =
    allProducts
      ?.filter((p) => p.category === product?.category && p.id !== product?.id)
      .slice(0, 4) || [];

  const handleAddToCart = () => {
    if (!product) return;
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    if (!product) return;

    const size =
      selectedSize ||
      product.sizes.find((item) => item.toLowerCase() === "s") ||
      product.sizes.find((item) => item.toLowerCase() === "small") ||
      product.sizes[0] ||
      "";
    const color = selectedColor || product.colors[0] || "";

    addItem({
      id: `${product.id}-${size}-${color}`,
      productId: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      size,
      color,
      quantity,
    });

    navigate({ to: "/checkout" });
  };

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-zinc-200 border-t-orange-600 rounded-full animate-spin" />
      </div>
    );

  if (!product)
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link
          to="/products"
          className="text-orange-600 font-bold block mt-4 underline"
        >
          Back to Shop
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12 space-y-24">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
        <Link to="/" className="hover:text-black">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link to="/products" className="hover:text-black">
          Products
        </Link>
        <ChevronRight size={14} />
        <span className="text-zinc-600">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="space-y-6">
          <motion.div
            layoutId={`img-${product.id}`}
            className="aspect-[4/5] bg-zinc-50 rounded-[2.5rem] overflow-hidden border shadow-sm group relative"
          >
            <img
              src={product.images[0]}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 cursor-zoom-in"
              alt={product.name}
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-6 right-6 p-4 rounded-3xl shadow-xl transition-all ${
                isWishlisted
                  ? "bg-orange-600 text-white"
                  : "bg-white text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {/* Displaying same image for mock, in real we would map product.images */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl overflow-hidden border border-zinc-100 cursor-pointer hover:border-black transition-colors"
              >
                <img
                  src={product.images[0]}
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  alt="Thumb"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-10">
          <div className="space-y-4 border-b pb-8">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i <= Math.floor(product.rating)
                        ? "fill-orange-400 text-orange-400"
                        : "text-zinc-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-zinc-500">
                ({product.reviewsCount} verified reviews)
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-black">
                {formatPrice(product.discountPrice || product.price)}
              </span>
              {product.discountPrice && (
                <span className="text-xl text-zinc-300 line-through font-medium">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <p className="text-zinc-500 text-lg leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          {/* Variants */}
          <div className="space-y-8">
            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold uppercase tracking-widest">
                    Select Color
                  </h4>
                  <span className="text-xs font-bold text-zinc-400 uppercase">
                    {selectedColor || "Choose one"}
                  </span>
                </div>
                <div className="flex gap-4">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`group relative p-1 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "border-orange-600 scale-110"
                          : "border-transparent"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full shadow-inner ${
                          color.toLowerCase() === "black"
                            ? "bg-black"
                            : color.toLowerCase().includes("gray")
                              ? "bg-gray-500"
                              : color.toLowerCase().includes("gold")
                                ? "bg-orange-300"
                                : "bg-zinc-100"
                        }`}
                      />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {color}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold uppercase tracking-widest">
                    Select Size
                  </h4>
                  <button className="text-xs font-bold text-orange-600 underline uppercase tracking-tighter">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[50px] h-12 flex items-center justify-center rounded-xl border-2 font-bold transition-all ${
                        selectedSize === size
                          ? "border-black bg-black text-white shadow-lg scale-105"
                          : "border-zinc-100 bg-zinc-50 text-zinc-600 hover:border-zinc-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest">
                Quantity
              </h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-zinc-100 rounded-2xl p-1 border">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="p-3 hover:bg-white rounded-xl transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="p-3 hover:bg-white rounded-xl transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <p className="text-xs text-zinc-400 font-medium">
                  Only <span className="text-red-500 font-bold">5 items</span>{" "}
                  left in stock!
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="xl"
                className="flex-grow text-lg bg-black hover:bg-zinc-800 text-white"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={20} className="mr-3" /> Add to Cart
              </Button>
              <Link to="/checkout" className="block"></Link>
              <Button
                size="xl"
                variant="accent"
                className="flex-grow text-lg shadow-orange-200"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>

              <button className="p-4 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-10 border-t">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-zinc-50 rounded-2xl">
                <Truck size={20} className="text-zinc-600" />
              </div>
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider mb-1">
                  Free Shipping
                </h5>
                <p className="text-[10px] text-zinc-400 leading-tight">
                  On all orders over $150
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-zinc-50 rounded-2xl">
                <RotateCcw size={20} className="text-zinc-600" />
              </div>
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider mb-1">
                  Easy Returns
                </h5>
                <p className="text-[10px] text-zinc-400 leading-tight">
                  30-day no-hassle return policy
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-zinc-50 rounded-2xl">
                <ShieldCheck size={20} className="text-zinc-600" />
              </div>
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider mb-1">
                  Secure Checkout
                </h5>
                <p className="text-[10px] text-zinc-400 leading-tight">
                  Fully encrypted transactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <section className="space-y-12">
        <div className="flex justify-center border-b border-zinc-100">
          <div className="flex gap-12">
            {[
              { id: "details", label: "Product Details" },
              { id: "reviews", label: `Reviews (${product.reviewsCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-6 text-sm font-bold uppercase tracking-widest relative transition-colors ${
                  activeTab === tab.id
                    ? "text-black"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto py-8">
          <AnimatePresence mode="wait">
            {activeTab === "details" ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="prose prose-zinc max-w-none space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold">Materials & Care</h4>
                    <ul className="list-disc pl-5 space-y-2 text-zinc-500 font-light">
                      <li>Outer Shell: 100% Recycled Technical Fabric</li>
                      <li>Water-resistant DWR coating</li>
                      <li>Environmentally friendly textile production</li>
                      <li>Cold machine wash only</li>
                      <li>Do not tumble dry</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold">Technical Features</h4>
                    <ul className="list-disc pl-5 space-y-2 text-zinc-500 font-light">
                      <li>High-breathability membrane</li>
                      <li>Reinforced stitching at stress points</li>
                      <li>Adjustable articulated hood</li>
                      <li>Concealed YKK zippers</li>
                      <li>Inner security pocket with RFID shielding</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="flex flex-col md:flex-row gap-12 items-center justify-center py-8 bg-zinc-50 rounded-3xl mb-12">
                  <div className="text-center space-y-2">
                    <div className="text-6xl font-black">{product.rating}</div>
                    <div className="flex gap-0.5 justify-center">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={20}
                          className="fill-orange-400 text-orange-400"
                        />
                      ))}
                    </div>
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                      Base on {product.reviewsCount} reviews
                    </div>
                  </div>
                  <div className="flex-grow max-w-sm space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div
                        key={star}
                        className="flex items-center gap-4 text-xs font-bold"
                      >
                        <span className="w-4">{star}</span>
                        <div className="flex-grow h-2 bg-zinc-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange-600 rounded-full"
                            style={{
                              width:
                                star === 5 ? "85%" : star === 4 ? "10%" : "1%",
                            }}
                          />
                        </div>
                        <span className="text-zinc-400 w-8">
                          {star === 5 ? "85%" : star === 4 ? "10%" : "1%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  {reviews?.map((review) => (
                    <div key={review.id} className="border-b pb-8">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center font-bold text-zinc-400">
                            {review.userName.charAt(0)}
                          </div>
                          <div>
                            <h5 className="font-bold">{review.userName}</h5>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={
                                    i <= review.rating
                                      ? "fill-orange-400 text-orange-400"
                                      : "text-zinc-100"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-zinc-400">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-zinc-600 leading-relaxed italic">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full h-14 uppercase tracking-widest border-2"
                  >
                    Write a Review
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-12">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
