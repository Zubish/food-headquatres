import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  Check,
  ChevronRight,
  Clock,
  Facebook,
  Flame,
  Heart,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  PhoneCall,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Store,
  Trash2,
  Truck,
  Twitter,
  X,
} from "lucide-react";

import heroJollof from "@/assets/hero-jollof.jpg";
import mealEgusi from "@/assets/meal-egusi.jpg";
import mealFriedRice from "@/assets/meal-friedrice.jpg";
import mealSuya from "@/assets/meal-suya.jpg";
import mealPastry from "@/assets/meal-pastry.jpg";
import mealDrink from "@/assets/meal-drink.jpg";
import mealPeppersoup from "@/assets/meal-peppersoup.jpg";
import chefKitchen from "@/assets/chef-kitchen.jpg";

type MenuCategory =
  | "Combo"
  | "Main Menu"
  | "Swallow Combo"
  | "Soups"
  | "Sides"
  | "Protein"
  | "Bread & Pastries"
  | "Drinks";

type MenuItem = {
  id: string;
  name: string;
  cat: MenuCategory;
  desc: string;
  price: number;
  img: string;
  tag?: string;
  options?: string[];
};

type CartItem = MenuItem & {
  qty: number;
};

type OrderMode = "Delivery" | "Pickup";

type CheckoutForm = {
  name: string;
  phone: string;
  address: string;
  note: string;
};

const brandPhone = "2348118877147";

const branches = [
  {
    name: "Ikeja Headquarters",
    addr: "7 Olowu Street, Allen, Ikeja, Lagos",
    phone: "08118877147",
    tag: "Flagship",
    eta: "25-35 min",
  },
  {
    name: "Fadeyi Branch",
    addr: "76 Ikorodu Road, beside Fidelity Bank, Fadeyi BRT Bus Stop, Lagos",
    phone: "08182450867",
    tag: "Pickup ready",
    eta: "30-40 min",
  },
];

const menuItems: MenuItem[] = [
  {
    id: "rice-combo",
    name: "Rice Combo",
    cat: "Combo",
    desc: "Build a plate with rice, side, protein and a chilled drink.",
    price: 5850,
    img: heroJollof,
    tag: "Popular",
    options: ["Jollof Rice", "Fried Rice", "White Rice", "Village Rice"],
  },
  {
    id: "lunch-combo",
    name: "Swallow Lunch Combo",
    cat: "Swallow Combo",
    desc: "Your choice of swallow, soup, protein and drink.",
    price: 5850,
    img: mealEgusi,
    tag: "Lunch deal",
    options: ["Pounded Yam", "Eba", "Semo", "Amala"],
  },
  {
    id: "jollof-rice",
    name: "Jollof Rice",
    cat: "Main Menu",
    desc: "Long grain rice cooked in a rich tomato pepper base.",
    price: 3900,
    img: heroJollof,
    tag: "Best seller",
  },
  {
    id: "fried-rice",
    name: "Fried Rice",
    cat: "Main Menu",
    desc: "Stir-fried rice with vegetables, stock and savoury spices.",
    price: 3400,
    img: mealFriedRice,
  },
  {
    id: "ofada-rice",
    name: "Ofada Rice",
    cat: "Main Menu",
    desc: "Steamed local rice served with spicy ayamase sauce.",
    price: 4300,
    img: mealFriedRice,
  },
  {
    id: "yam-porridge",
    name: "Yam Porridge",
    cat: "Main Menu",
    desc: "Chunky yam cubes cooked in palm oil and pepper sauce.",
    price: 4700,
    img: mealPeppersoup,
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup",
    cat: "Soups",
    desc: "Melon soup cooked with greens, peppers and assorted meat flavour.",
    price: 3600,
    img: mealEgusi,
  },
  {
    id: "catfish-pepper-soup",
    name: "Catfish Pepper Soup",
    cat: "Soups",
    desc: "Fresh catfish in a warm, fragrant pepper soup broth.",
    price: 4800,
    img: mealPeppersoup,
    tag: "Hot",
  },
  {
    id: "beef-suya",
    name: "Beef Suya Platter",
    cat: "Protein",
    desc: "Spicy grilled beef, onions, pepper mix and suya spice.",
    price: 3800,
    img: mealSuya,
  },
  {
    id: "grilled-chicken",
    name: "Grilled Chicken",
    cat: "Protein",
    desc: "Flame-grilled chicken finished with Food HQ pepper sauce.",
    price: 3200,
    img: heroJollof,
  },
  {
    id: "plantain",
    name: "Fried Plantain",
    cat: "Sides",
    desc: "Golden ripe plantain, fried fresh per order.",
    price: 1200,
    img: mealFriedRice,
  },
  {
    id: "meat-pie",
    name: "Meat Pie",
    cat: "Bread & Pastries",
    desc: "Buttery pastry filled with seasoned minced beef and vegetables.",
    price: 1500,
    img: mealPastry,
  },
  {
    id: "puff-puff",
    name: "Puff Puff Pack",
    cat: "Bread & Pastries",
    desc: "Soft golden puff puff for snacking or sharing.",
    price: 1200,
    img: mealPastry,
  },
  {
    id: "chapman",
    name: "Chapman Cooler",
    cat: "Drinks",
    desc: "Lagos-style chapman with citrus, berry and ice.",
    price: 1800,
    img: mealDrink,
  },
  {
    id: "zobo",
    name: "Zobo",
    cat: "Drinks",
    desc: "Chilled hibiscus drink with ginger and pineapple notes.",
    price: 1000,
    img: mealDrink,
  },
];

const categories: Array<"All" | MenuCategory> = [
  "All",
  "Combo",
  "Main Menu",
  "Swallow Combo",
  "Soups",
  "Sides",
  "Protein",
  "Bread & Pastries",
  "Drinks",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Food Headquarters | Experience Great Taste in Lagos" },
      {
        name: "description",
        content:
          "Food Headquarters Lagos web ordering app for fresh Nigerian meals, delivery, pickup, branches and WhatsApp checkout.",
      },
      { property: "og:title", content: "Food Headquarters | Experience Great Taste" },
      {
        property: "og:description",
        content:
          "Browse Food Headquarters meals, build your cart, and order for delivery or pickup in Lagos.",
      },
      { property: "og:image", content: heroJollof },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

function formatPrice(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

function buildWhatsAppMessage(
  cart: CartItem[],
  mode: OrderMode,
  branch: string,
  form: CheckoutForm,
  total: number,
) {
  const lines = [
    "Hello Food Headquarters, I would like to place an order.",
    "",
    ...cart.map((item) => `${item.qty} x ${item.name} - ${formatPrice(item.price * item.qty)}`),
    "",
    `Total: ${formatPrice(total)}`,
    `Order type: ${mode}`,
    `Branch: ${branch}`,
    form.name ? `Name: ${form.name}` : "",
    form.phone ? `Phone: ${form.phone}` : "",
    mode === "Delivery" && form.address ? `Address: ${form.address}` : "",
    form.note ? `Note: ${form.note}` : "",
  ].filter(Boolean);

  return `https://wa.me/${brandPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className="leading-none">
      <div className="font-brand text-xl sm:text-2xl font-black tracking-normal">
        <span className="text-accent">Food</span>{" "}
        <span className={inverted ? "text-fresh" : "text-brand-green"}>Headquarters</span>
      </div>
      <div className={inverted ? "mt-1 text-[10px] uppercase tracking-widest text-primary-foreground/85" : "mt-1 text-[10px] uppercase tracking-widest text-muted-foreground"}>
        Experience Great Taste
      </div>
    </div>
  );
}

function Landing() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCat, setActiveCat] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderMode, setOrderMode] = useState<OrderMode>("Delivery");
  const [selectedBranch, setSelectedBranch] = useState(branches[0].name);
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const categoryMatch = activeCat === "All" || item.cat === activeCat;
      const searchMatch =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.desc.toLowerCase().includes(normalizedQuery) ||
        item.cat.toLowerCase().includes(normalizedQuery);
      return categoryMatch && searchMatch;
    });
  }, [activeCat, query]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = orderMode === "Delivery" && cart.length > 0 ? 1200 : 0;
  const total = subtotal + deliveryFee;
  const selectedBranchDetails = branches.find((branch) => branch.name === selectedBranch) ?? branches[0];
  const checkoutHref = buildWhatsAppMessage(cart, orderMode, selectedBranch, form, total);

  const addToCart = (item: MenuItem) => {
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem,
        );
      }
      return [...current, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: string, nextQty: number) => {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, nextQty) } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (id: string) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const navItems = ["Home", "Menu", "Branches", "Delivery", "Contact"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled || navOpen ? "bg-background/92 backdrop-blur-lg shadow-elev1" : "bg-transparent"}`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
          <a href="#home" className="flex items-center" aria-label="Food Headquarters home">
            <Logo inverted={!scrolled && !navOpen} />
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/78 transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-elev1 transition hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring sm:size-auto sm:gap-2 sm:px-5 sm:py-2.5"
              aria-label={`Open cart with ${cartCount} items`}
            >
              <ShoppingBag className="size-4" />
              <span className="hidden text-sm font-semibold sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setNavOpen(!navOpen)}
              className="grid size-10 place-items-center rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring lg:hidden"
              aria-label={navOpen ? "Close menu" : "Open menu"}
            >
              {navOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {navOpen && (
          <div className="border-t border-border bg-background/96 backdrop-blur-lg lg:hidden">
            <div className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={() => setNavOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-muted"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img
          src={heroJollof}
          alt="Smoky Nigerian jollof rice with grilled chicken"
          className="absolute inset-0 h-full w-full object-cover animate-shimmer"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-32 text-primary-foreground sm:px-6 sm:pb-20">
          <div className="max-w-2xl space-y-6 animate-float-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
              <span className="size-2 rounded-full bg-fresh animate-pulse" /> Open today · 7AM - 10PM
            </span>
            <div className="space-y-2">
              <h1 className="text-4xl font-black leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
                Experience
                <br />
                <span className="bg-gradient-to-r from-accent to-primary-foreground bg-clip-text text-transparent">
                  Great Taste.
                </span>
              </h1>
            </div>
            <p className="max-w-lg text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
              Browse Food Headquarters meals, build your cart, and order fresh Nigerian favourites for delivery or pickup.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-foreground"
              >
                <ShoppingBag className="size-5" /> Order Now <ArrowRight className="size-4" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="size-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="font-semibold">4.6</span>
                <span className="text-primary-foreground/70">· trusted by Lagos diners</span>
              </div>
              <div className="h-4 w-px bg-primary-foreground/30" />
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Truck className="size-4" /> Branch-aware delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 sm:px-6 md:grid-cols-4">
          {[
            { icon: Award, label: "4.6 rated", sub: "public restaurant rating" },
            { icon: Truck, label: "Delivery & pickup", sub: "choose at checkout" },
            { icon: Leaf, label: "Fresh daily", sub: "made to order" },
            { icon: Heart, label: "Lagos favourite", sub: "Ikeja and Fadeyi" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <div className="text-sm font-bold">{label}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="menu" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Order Online</span>
              <h2 className="mt-2 text-3xl font-black text-balance sm:text-5xl">Build your Food Headquarters order</h2>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold shadow-elev1 transition hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <ShoppingBag className="size-4" />
              {cartCount} {cartCount === 1 ? "item" : "items"} · {formatPrice(total)}
              <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_auto]">
            <label className="relative block">
              <span className="sr-only">Search menu</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search jollof, egusi, combo, drinks..."
                className="h-12 w-full rounded-xl border border-input bg-card pl-12 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </label>
            <div className="inline-flex rounded-xl border border-border bg-card p-1">
              {(["Delivery", "Pickup"] as OrderMode[]).map((mode) => (
                <button
                  type="button"
                  key={mode}
                  onClick={() => setOrderMode(mode)}
                  className={`inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-bold transition ${orderMode === mode ? "bg-primary text-primary-foreground shadow-elev1" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {mode === "Delivery" ? <Truck className="size-4" /> : <Store className="size-4" />}
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCat(category)}
                className={`h-10 shrink-0 rounded-full border px-5 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-ring ${activeCat === category ? "border-primary bg-primary text-primary-foreground shadow-elev2" : "border-border bg-card text-foreground hover:border-primary/40"}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-elev1 transition-all hover:-translate-y-1 hover:shadow-elev3"
                style={{ animationDelay: `${index * 45}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.tag && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-wider text-primary-foreground shadow-elev2">
                      <Flame className="size-3" /> {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-xs font-bold text-brand-green">{item.cat}</div>
                  <h3 className="mt-1 font-brand text-xl font-black">{item.name}</h3>
                  <p className="mt-1.5 min-h-11 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  {item.options && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.options.slice(0, 3).map((option) => (
                        <span key={option} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                          {option}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="font-brand text-2xl font-black text-primary">{formatPrice(item.price)}</div>
                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-bold text-background transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <Plus className="size-4" /> Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-cream py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-elev3">
              <img
                src={chefKitchen}
                alt="Food Headquarters chef plating a fresh meal"
                loading="lazy"
                width={1400}
                height={1000}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold text-primary-foreground backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-destructive animate-pulse" /> Kitchen active today
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 hidden max-w-xs rounded-2xl border border-border bg-card p-5 shadow-elev3 sm:block">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-xl bg-fresh/15">
                  <Leaf className="size-6 text-fresh" />
                </div>
                <div>
                  <div className="font-brand text-lg font-black">100% Fresh</div>
                  <div className="text-xs text-muted-foreground">Prepared for real orders</div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 space-y-5 lg:order-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Our Kitchen Story</span>
            <h2 className="text-3xl font-black leading-tight text-balance sm:text-5xl">
              The same Food HQ feel, now ready for web ordering.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              The current experience stays intact: bold food imagery, warm Lagos energy, and the "Experience Great Taste"
              promise. Around it, customers can now browse, cart, choose a branch, and send a structured order.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { n: "8", l: "menu categories" },
                { n: "2", l: "branch options" },
                { n: "1", l: "WhatsApp checkout" },
              ].map((stat) => (
                <div key={stat.l} className="rounded-2xl border border-border bg-card p-4 shadow-elev1">
                  <div className="font-brand text-2xl font-black text-primary sm:text-3xl">{stat.n}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="bg-charcoal py-16 text-primary-foreground sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Order Your Way</span>
            <h2 className="mt-2 text-3xl font-black text-balance sm:text-5xl">A real flow from menu to kitchen</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShoppingBag, title: "Browse", desc: "Search meals and filter by menu category." },
              { icon: Plus, title: "Build cart", desc: "Add items and adjust quantities instantly." },
              { icon: Store, title: "Choose branch", desc: "Select pickup or delivery from the right location." },
              { icon: MessageCircle, title: "Send order", desc: "Open WhatsApp with a clean order summary." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-primary-foreground/10">
                <div className="grid size-14 place-items-center rounded-xl bg-gradient-warm shadow-glow">
                  <Icon className="size-6 text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-brand text-xl font-black">{title}</h3>
                <p className="mt-1.5 text-sm text-primary-foreground/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-warm p-8 text-primary-foreground shadow-glow sm:p-12 lg:p-16">
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-black uppercase tracking-wider backdrop-blur">
                  <Flame className="size-3" /> Combo Deal
                </span>
                <h2 className="mt-4 text-3xl font-black leading-tight text-balance sm:text-5xl">
                  Lunch combo from {formatPrice(5850)}
                </h2>
                <p className="mt-3 max-w-md text-primary-foreground/90">
                  Choose rice or swallow, add your protein and drink, then send the order straight to the team.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const combo = menuItems.find((item) => item.id === "rice-combo");
                      if (combo) addToCart(combo);
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 font-black text-primary shadow-elev2 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-foreground"
                  >
                    Add Rice Combo <ArrowRight className="size-4" />
                  </button>
                  <a
                    href="#menu"
                    className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 font-bold transition hover:bg-primary-foreground/10"
                  >
                    See menu
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src={mealFriedRice}
                  alt="Food Headquarters lunch combo"
                  className="aspect-square rounded-2xl object-cover shadow-elev3"
                  loading="lazy"
                  width={600}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="branches" className="bg-secondary/40 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Visit Us</span>
            <h2 className="mt-2 text-3xl font-black text-balance sm:text-5xl">Two branches across Lagos</h2>
            <p className="mt-3 text-muted-foreground">
              Open every day from 7AM to 10PM. Pick the closest branch during checkout.
            </p>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {branches.map((branch) => (
              <div key={branch.name} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-elev1 transition-all hover:shadow-elev3">
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <iframe
                    title={branch.name}
                    className="absolute inset-0 h-full w-full grayscale-[20%] transition-all group-hover:grayscale-0"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(branch.addr)}&output=embed`}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">{branch.tag}</span>
                      <h3 className="mt-1 font-brand text-xl font-black">{branch.name}</h3>
                    </div>
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="size-5" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{branch.addr}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <span className="inline-flex items-center gap-1.5 text-foreground/80">
                      <Clock className="size-4 text-primary" /> 7AM - 10PM
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-foreground/80">
                      <Truck className="size-4 text-primary" /> {branch.eta}
                    </span>
                    <a href={`tel:${branch.phone}`} className="inline-flex items-center gap-1.5 text-foreground/80 hover:text-primary">
                      <Phone className="size-4 text-primary" /> {branch.phone}
                    </a>
                  </div>
                  <div className="mt-5 flex gap-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.addr)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:shadow-elev2"
                    >
                      <MapPin className="size-4" /> Directions
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBranch(branch.name);
                        setCartOpen(true);
                      }}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-bold transition hover:bg-muted"
                    >
                      <Check className="size-4" /> Use branch
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black text-balance sm:text-5xl">Hungry? Your cart is ready when you are.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Add meals, choose delivery or pickup, and send a structured order to Food Headquarters.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <ShoppingBag className="size-5" /> Review Cart
            </button>
            <a
              href={`https://wa.me/${brandPhone}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-fresh px-7 py-4 font-bold text-primary-foreground shadow-elev2 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <MessageCircle className="size-5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-charcoal text-primary-foreground/90">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          <div>
            <Logo inverted />
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              Lagos restaurant web ordering concept built around the current Food HQ experience.
            </p>
            <div className="mt-5 flex gap-2">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <a key={index} href="#" className="grid size-10 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-primary" aria-label="Food Headquarters social link">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-brand text-lg font-black text-primary-foreground">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((label) => (
                <li key={label}>
                  <a href={`#${label.toLowerCase()}`} className="text-primary-foreground/70 transition-colors hover:text-accent">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-brand text-lg font-black text-primary-foreground">Call To Order</h4>
            <ul className="space-y-2.5 text-sm">
              {["08118877147", "08182450867", "08149735235"].map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone}`} className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-accent">
                    <Phone className="size-3.5" /> {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-brand text-lg font-black text-primary-foreground">Hours & Address</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-accent" /> 7AM - 10PM Daily
              </li>
              {branches.map((branch) => (
                <li key={branch.name} className="flex gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" /> {branch.addr}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-primary-foreground/60 sm:px-6">
            <div>© {new Date().getFullYear()} Food Headquarters. All rights reserved.</div>
            <div>
              Made with <Heart className="inline size-3 fill-primary text-primary" /> in Lagos
            </div>
          </div>
        </div>
      </footer>

      {cartOpen && (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 bg-charcoal/55 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-background shadow-elev3 sm:rounded-l-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="font-brand text-2xl font-black">Your Order</h2>
                <p className="text-sm text-muted-foreground">
                  {cartCount} {cartCount === 1 ? "item" : "items"} from {selectedBranchDetails.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="grid size-10 place-items-center rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Close cart"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {cart.length === 0 ? (
                <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-8 text-center">
                  <ShoppingBag className="size-12 text-muted-foreground" />
                  <h3 className="mt-4 font-brand text-xl font-black">No meals added yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Add meals from the menu to prepare a WhatsApp order.</p>
                  <a
                    href="#menu"
                    onClick={() => setCartOpen(false)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
                  >
                    Browse menu <ArrowRight className="size-4" />
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="grid grid-cols-[72px_1fr] gap-3 rounded-2xl border border-border bg-card p-3">
                      <img src={item.img} alt={item.name} className="size-[72px] rounded-xl object-cover" />
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-xs text-muted-foreground">{item.cat}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-destructive"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="font-brand text-lg font-black text-primary">{formatPrice(item.price * item.qty)}</div>
                          <div className="inline-flex items-center rounded-full border border-border bg-background p-1">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="grid size-8 place-items-center rounded-full hover:bg-muted"
                              aria-label={`Decrease ${item.name}`}
                            >
                              <Minus className="size-4" />
                            </button>
                            <span className="min-w-8 text-center text-sm font-black">{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                              aria-label={`Increase ${item.name}`}
                            >
                              <Plus className="size-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-4">
                <div>
                  <div className="mb-2 text-sm font-black">Order type</div>
                  <div className="grid grid-cols-2 gap-2">
                    {(["Delivery", "Pickup"] as OrderMode[]).map((mode) => (
                      <button
                        type="button"
                        key={mode}
                        onClick={() => setOrderMode(mode)}
                        className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-bold transition ${orderMode === mode ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"}`}
                      >
                        {mode === "Delivery" ? <Truck className="size-4" /> : <Store className="size-4" />}
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-black">Branch</span>
                  <select
                    value={selectedBranch}
                    onChange={(event) => setSelectedBranch(event.target.value)}
                    className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                  >
                    {branches.map((branch) => (
                      <option key={branch.name}>{branch.name}</option>
                    ))}
                  </select>
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-black">Name</span>
                    <input
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-black">Phone</span>
                    <input
                      value={form.phone}
                      onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                      className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                </div>

                {orderMode === "Delivery" && (
                  <label className="block">
                    <span className="mb-2 block text-sm font-black">Delivery address</span>
                    <textarea
                      value={form.address}
                      onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                      rows={3}
                      className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                )}

                <label className="block">
                  <span className="mb-2 block text-sm font-black">Order note</span>
                  <input
                    value={form.note}
                    onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
                    placeholder="Extra pepper, no onions, pickup time..."
                    className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-border bg-card px-5 py-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-bold">{orderMode === "Delivery" ? formatPrice(deliveryFee) : "Pickup"}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 font-brand text-xl font-black">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
              <a
                href={cart.length > 0 ? checkoutHref : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={cart.length === 0}
                className={`mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-black transition ${cart.length > 0 ? "bg-fresh text-primary-foreground shadow-elev2 hover:-translate-y-0.5" : "pointer-events-none bg-muted text-muted-foreground"}`}
              >
                <MessageCircle className="size-5" /> Send Order on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      )}

      {cartCount > 0 && !cartOpen && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed inset-x-4 bottom-4 z-50 flex h-14 items-center justify-between rounded-full bg-charcoal px-5 text-primary-foreground shadow-glow focus:outline-none focus:ring-2 focus:ring-ring sm:hidden"
        >
          <span className="inline-flex items-center gap-2 text-sm font-black">
            <ShoppingBag className="size-4" /> {cartCount} items
          </span>
          <span className="font-brand text-lg font-black text-accent">{formatPrice(total)}</span>
        </button>
      )}
    </div>
  );
}
