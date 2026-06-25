import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  Facebook,
  Gift,
  Heart,
  Instagram,
  Leaf,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  PartyPopper,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Trash2,
  Truck,
  Twitter,
  User,
  Users,
  Utensils,
  X,
} from "lucide-react";

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
  spice: "Mild" | "Medium" | "Hot";
  prep: string;
  serves: string;
  pairings: string[];
  details: string[];
};

type CartItem = MenuItem & { qty: number };
type OrderMode = "Delivery" | "Pickup";
type AuthMode = "signin" | "signup";

type CheckoutForm = {
  name: string;
  phone: string;
  address: string;
  note: string;
};

type ReservationForm = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  branch: string;
  occasion: string;
  note: string;
};

type AuthUser = {
  name: string;
  email: string;
  phone: string;
  provider: "email" | "google";
};

type Toast = {
  tone: "success" | "info" | "warning";
  title: string;
  message: string;
};

const brandPhone = "2348118877147";

const commonsImage = (file: string, width = 1400) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

const foodImages = {
  hero: commonsImage("A Nigeria Jollof Rice with chicken.jpg", 1800),
  jollof: commonsImage("A plate of jollof rice and chicken.jpg", 1400),
  friedRice: commonsImage("A food flask of Fried rice.jpg", 1400),
  ofada: commonsImage("Ofada Rice and Jollof Rice.jpg", 1400),
  yam: commonsImage("Yam pottage or Àsáró.jpg", 1400),
  egusi: commonsImage("Pounded Yam and Egusi Soup.jpg", 1400),
  pepperSoup: commonsImage("Cat fish pepper soup with 5Alive drink.jpg", 1400),
  suya: commonsImage("Suya take away.jpg", 1400),
  chicken: commonsImage("Grilling chicken.jpg", 1400),
  plantain: commonsImage("Fried plantains.jpg", 1400),
  meatPie: commonsImage("Meat pie in Northern Nigeria.jpg", 1400),
  puffPuff: commonsImage("Nigerian-puff-puff-recipe.jpg", 1400),
  chapman: commonsImage("Chapman drink.jpg", 1400),
  zobo: commonsImage("Chilled Zobo drink.jpg", 1400),
};

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
    desc: "A complete plate with rice, protein, side and a chilled drink.",
    price: 5850,
    img: foodImages.jollof,
    tag: "Popular",
    spice: "Medium",
    prep: "20 min",
    serves: "1 plate",
    pairings: ["Chicken", "Plantain", "Chapman"],
    details: ["Choice of rice", "Protein included", "Drink included"],
  },
  {
    id: "lunch-combo",
    name: "Swallow Lunch Combo",
    cat: "Swallow Combo",
    desc: "Swallow, soup, protein and drink for a proper Nigerian lunch.",
    price: 5850,
    img: foodImages.egusi,
    tag: "Lunch deal",
    spice: "Medium",
    prep: "25 min",
    serves: "1 bowl",
    pairings: ["Pounded yam", "Egusi", "Beef"],
    details: ["Choose swallow", "Soup included", "Protein included"],
  },
  {
    id: "jollof-rice",
    name: "Jollof Rice",
    cat: "Main Menu",
    desc: "Smoky tomato rice cooked with peppers, spices and stock.",
    price: 3900,
    img: foodImages.jollof,
    tag: "Best seller",
    spice: "Medium",
    prep: "18 min",
    serves: "1 plate",
    pairings: ["Chicken", "Plantain", "Coleslaw"],
    details: ["Party-style rice", "Fresh daily", "Add protein"],
  },
  {
    id: "fried-rice",
    name: "Fried Rice",
    cat: "Main Menu",
    desc: "Nigerian fried rice with vegetables, stock and savoury spices.",
    price: 3400,
    img: foodImages.friedRice,
    spice: "Mild",
    prep: "18 min",
    serves: "1 plate",
    pairings: ["Chicken", "Beef", "Plantain"],
    details: ["Vegetable rice", "Party favourite", "Add protein"],
  },
  {
    id: "ofada-rice",
    name: "Ofada Rice",
    cat: "Main Menu",
    desc: "Local rice served with rich ayamase-style pepper sauce.",
    price: 4300,
    img: foodImages.ofada,
    spice: "Hot",
    prep: "22 min",
    serves: "1 plate",
    pairings: ["Assorted meat", "Boiled egg", "Plantain"],
    details: ["Local rice", "Pepper sauce", "Hearty portion"],
  },
  {
    id: "yam-porridge",
    name: "Yam Porridge",
    cat: "Main Menu",
    desc: "Yam pottage cooked with palm oil, peppers and vegetables.",
    price: 4700,
    img: foodImages.yam,
    spice: "Medium",
    prep: "25 min",
    serves: "1 bowl",
    pairings: ["Fish", "Plantain", "Zobo"],
    details: ["Soft yam chunks", "Palm oil base", "Comfort meal"],
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup",
    cat: "Soups",
    desc: "Melon seed soup with greens, peppers and assorted meat flavour.",
    price: 3600,
    img: foodImages.egusi,
    spice: "Medium",
    prep: "20 min",
    serves: "1 bowl",
    pairings: ["Pounded yam", "Eba", "Semo"],
    details: ["Melon seed soup", "Leafy greens", "Swallow-ready"],
  },
  {
    id: "catfish-pepper-soup",
    name: "Catfish Pepper Soup",
    cat: "Soups",
    desc: "Fresh catfish in a warm, fragrant Nigerian pepper soup broth.",
    price: 4800,
    img: foodImages.pepperSoup,
    tag: "Hot",
    spice: "Hot",
    prep: "25 min",
    serves: "1 bowl",
    pairings: ["Plantain", "White rice", "Zobo"],
    details: ["Fresh catfish", "Pepper soup spice", "Served hot"],
  },
  {
    id: "beef-suya",
    name: "Beef Suya Platter",
    cat: "Protein",
    desc: "Spicy grilled beef suya with onions and yaji spice.",
    price: 3800,
    img: foodImages.suya,
    spice: "Hot",
    prep: "15 min",
    serves: "Skewer plate",
    pairings: ["Jollof", "Chapman", "Onions"],
    details: ["Grilled beef", "Yaji spice", "Street-food style"],
  },
  {
    id: "grilled-chicken",
    name: "Grilled Chicken",
    cat: "Protein",
    desc: "Grilled chicken finished with Food Headquarters pepper sauce.",
    price: 3200,
    img: foodImages.chicken,
    spice: "Medium",
    prep: "18 min",
    serves: "1 piece",
    pairings: ["Jollof", "Fried rice", "Plantain"],
    details: ["Grilled finish", "Pepper glaze", "Add to any plate"],
  },
  {
    id: "plantain",
    name: "Fried Plantain",
    cat: "Sides",
    desc: "Golden ripe plantain, fried fresh per order.",
    price: 1200,
    img: foodImages.plantain,
    spice: "Mild",
    prep: "10 min",
    serves: "Side portion",
    pairings: ["Jollof", "Beans", "Grilled chicken"],
    details: ["Sweet plantain", "Crisp edges", "Good add-on"],
  },
  {
    id: "meat-pie",
    name: "Meat Pie",
    cat: "Bread & Pastries",
    desc: "Buttery pastry filled with seasoned beef and vegetables.",
    price: 1500,
    img: foodImages.meatPie,
    spice: "Mild",
    prep: "Ready daily",
    serves: "1 pastry",
    pairings: ["Zobo", "Chapman", "Puff puff"],
    details: ["Savory pastry", "Beef filling", "Snack friendly"],
  },
  {
    id: "puff-puff",
    name: "Puff Puff Pack",
    cat: "Bread & Pastries",
    desc: "Soft golden puff puff for snacking or sharing.",
    price: 1200,
    img: foodImages.puffPuff,
    spice: "Mild",
    prep: "Ready daily",
    serves: "Snack pack",
    pairings: ["Zobo", "Chapman", "Meat pie"],
    details: ["Fried dough", "Shareable", "Sweet snack"],
  },
  {
    id: "chapman",
    name: "Chapman Cooler",
    cat: "Drinks",
    desc: "Classic Nigerian Chapman with citrus, cucumber and ice.",
    price: 1800,
    img: foodImages.chapman,
    spice: "Mild",
    prep: "5 min",
    serves: "1 cup",
    pairings: ["Suya", "Jollof", "Meat pie"],
    details: ["Served cold", "Citrus garnish", "Mocktail"],
  },
  {
    id: "zobo",
    name: "Zobo",
    cat: "Drinks",
    desc: "Chilled hibiscus drink with ginger and pineapple notes.",
    price: 1000,
    img: foodImages.zobo,
    spice: "Mild",
    prep: "5 min",
    serves: "1 bottle",
    pairings: ["Puff puff", "Yam porridge", "Pepper soup"],
    details: ["Hibiscus drink", "Served cold", "Refreshing"],
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
          "Food Headquarters Lagos web ordering app for meals, reservations, delivery, pickup, WhatsApp checkout and online checkout.",
      },
      { property: "og:title", content: "Food Headquarters | Experience Great Taste" },
      {
        property: "og:description",
        content:
          "Browse Food Headquarters meals, reserve a table, build your cart, and order for delivery or pickup in Lagos.",
      },
      { property: "og:image", content: foodImages.hero },
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
      <div className="font-brand text-xl font-black tracking-normal sm:text-2xl">
        <span className="text-accent">Food</span>{" "}
        <span className={inverted ? "text-fresh" : "text-brand-green"}>Headquarters</span>
      </div>
      <div
        className={
          inverted
            ? "mt-1 text-[10px] uppercase tracking-widest text-primary-foreground/85"
            : "mt-1 text-[10px] uppercase tracking-widest text-muted-foreground"
        }
      >
        Experience Great Taste
      </div>
    </div>
  );
}

function QuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
  label,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  label: string;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background p-1 shadow-elev1">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity === 0}
        className="grid size-9 place-items-center rounded-full text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:text-muted-foreground/45"
        aria-label={`Decrease ${label}`}
      >
        <Minus className="size-4" />
      </button>
      <span className="min-w-9 text-center text-sm font-black" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90"
        aria-label={`Increase ${label}`}
      >
        <Plus className="size-4" />
      </button>
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
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationDone, setReservationDone] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [orderMode, setOrderMode] = useState<OrderMode>("Delivery");
  const [selectedBranch, setSelectedBranch] = useState(branches[0].name);
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [reservationForm, setReservationForm] = useState<ReservationForm>({
    name: "",
    phone: "",
    date: "",
    time: "19:00",
    guests: "2",
    branch: branches[0].name,
    occasion: "",
    note: "",
  });
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("food-hq-user");
    if (saved) {
      setUser(JSON.parse(saved) as AuthUser);
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

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
  const serviceFee = checkoutOpen && cart.length > 0 ? 350 : 0;
  const total = subtotal + deliveryFee;
  const checkoutTotal = total + serviceFee;
  const selectedBranchDetails =
    branches.find((branch) => branch.name === selectedBranch) ?? branches[0];
  const checkoutHref = buildWhatsAppMessage(cart, orderMode, selectedBranch, form, total);
  const orderProgress = Math.min(
    100,
    cartCount * 25 + (form.name ? 20 : 0) + (form.phone ? 20 : 0),
  );

  const showToast = (nextToast: Toast) => setToast(nextToast);
  const itemQty = (id: string) => cart.find((item) => item.id === id)?.qty ?? 0;

  const updateQty = (item: MenuItem, nextQty: number) => {
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);
      if (nextQty <= 0) {
        return current.filter((cartItem) => cartItem.id !== item.id);
      }
      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, qty: nextQty } : cartItem,
        );
      }
      return [...current, { ...item, qty: nextQty }];
    });
    showToast({
      tone: nextQty > 0 ? "success" : "info",
      title: nextQty > 0 ? `${item.name} updated` : `${item.name} removed`,
      message: nextQty > 0 ? `${nextQty} in your order.` : "Your cart has been updated.",
    });
  };

  const removeItem = (id: string) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    setCart((current) => current.filter((cartItem) => cartItem.id !== id));
    if (item) {
      showToast({
        tone: "info",
        title: `${item.name} removed`,
        message: "Your order total has been updated.",
      });
    }
  };

  const saveUser = (nextUser: AuthUser) => {
    setUser(nextUser);
    window.localStorage.setItem("food-hq-user", JSON.stringify(nextUser));
    setForm((current) => ({
      ...current,
      name: current.name || nextUser.name,
      phone: current.phone || nextUser.phone,
    }));
  };

  const handleEmailAuth = () => {
    const name =
      authMode === "signup"
        ? authForm.name.trim()
        : authForm.email.split("@")[0] || "Food HQ Guest";
    if (
      !authForm.email.trim() ||
      !authForm.password.trim() ||
      (authMode === "signup" && !authForm.phone.trim())
    ) {
      showToast({
        tone: "warning",
        title: "Complete your details",
        message: "Email, password and phone are required before checkout.",
      });
      return;
    }
    saveUser({
      name: name || "Food HQ Guest",
      email: authForm.email,
      phone: authForm.phone || form.phone,
      provider: "email",
    });
    setAuthOpen(false);
    showToast({
      tone: "success",
      title: authMode === "signup" ? "Account created" : "Signed in",
      message: "You can now continue to checkout.",
    });
    setCheckoutOpen(true);
  };

  const handleGoogleAuth = () => {
    saveUser({
      name: "Google Customer",
      email: "customer@gmail.com",
      phone: form.phone,
      provider: "google",
    });
    setAuthOpen(false);
    showToast({
      tone: "success",
      title: "Google sign-in complete",
      message: "You can now continue to checkout.",
    });
    setCheckoutOpen(true);
  };

  const requireAuthForCheckout = () => {
    if (cart.length === 0) {
      showToast({
        tone: "warning",
        title: "Your cart is empty",
        message: "Add meals before starting checkout.",
      });
      return;
    }
    if (!user) {
      setAuthMode("signin");
      setAuthOpen(true);
      showToast({
        tone: "info",
        title: "Sign in required",
        message: "Create or access your account to checkout online.",
      });
      return;
    }
    setCheckoutOpen(true);
  };

  const confirmReservation = () => {
    if (
      !reservationForm.name ||
      !reservationForm.phone ||
      !reservationForm.date ||
      !reservationForm.time
    ) {
      showToast({
        tone: "warning",
        title: "Reservation details needed",
        message: "Name, phone, date and time are required.",
      });
      return;
    }
    setReservationDone(true);
    showToast({
      tone: "success",
      title: "Reservation request prepared",
      message: "Food Headquarters can confirm this table by phone or WhatsApp.",
    });
  };

  const navItems = ["Home", "Menu", "Reservations", "Branches", "Delivery", "Contact"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || navOpen ? "bg-background/92 shadow-elev1 backdrop-blur-lg" : "bg-transparent"}`}
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
              onClick={() => setReservationOpen(true)}
              className="hidden rounded-full px-4 py-2 text-sm font-bold text-foreground transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring sm:inline-flex"
            >
              Reservations
            </button>
            {user && (
              <button
                type="button"
                onClick={() => {
                  setUser(null);
                  window.localStorage.removeItem("food-hq-user");
                  showToast({
                    tone: "info",
                    title: "Signed out",
                    message: "You can still order on WhatsApp.",
                  });
                }}
                className="hidden rounded-full border border-border bg-card px-3 py-2 text-xs font-bold shadow-elev1 sm:inline-flex"
              >
                <User className="mr-1 size-3.5" />
                {user.name.split(" ")[0]}
                <LogOut className="ml-1 size-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-elev1 transition hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring sm:size-auto sm:gap-2 sm:px-5 sm:py-2.5"
              aria-label={`Open cart with ${cartCount} items`}
            >
              <ShoppingBag className="size-4" />
              <span className="hidden text-sm font-semibold sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid min-w-5 animate-bounce place-items-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
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
              <button
                type="button"
                onClick={() => {
                  setNavOpen(false);
                  setReservationOpen(true);
                }}
                className="rounded-2xl px-4 py-3 text-left text-sm font-bold text-primary hover:bg-muted"
              >
                Reserve a table
              </button>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img
          src={foodImages.hero}
          alt="Nigerian jollof rice with chicken"
          className="absolute inset-0 h-full w-full object-cover animate-shimmer"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-32 text-primary-foreground sm:px-6 sm:pb-20">
          <div className="max-w-2xl space-y-6 animate-float-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
              <span className="size-2 rounded-full bg-fresh animate-pulse" /> Open today · 7AM -
              10PM
            </span>
            <h1 className="text-4xl font-black leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
              Experience
              <br />
              <span className="bg-gradient-to-r from-accent to-primary-foreground bg-clip-text text-transparent">
                Great Taste.
              </span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
              Browse Food Headquarters meals, build your cart, reserve a table, and order fresh
              Nigerian favourites for delivery or pickup.
            </p>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-foreground"
            >
              <ShoppingBag className="size-5" /> Order Now <ArrowRight className="size-4" />
            </a>

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
            { icon: CalendarDays, label: "Reservations", sub: "book a table quickly" },
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
          <div className="mb-8 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Order Online
            </span>
            <h2 className="mt-2 text-3xl font-black text-balance sm:text-5xl">
              Build your Food Headquarters order
            </h2>
            <p className="mt-3 text-muted-foreground">
              Use the quantity controls on each card to order multiple plates in one go. Your cart
              stays available in the navbar.
            </p>
          </div>

          <label className="relative mb-6 block">
            <span className="sr-only">Search menu</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search jollof, egusi, combo, drinks..."
              className="h-12 w-full rounded-xl border border-input bg-card pl-12 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          </label>

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
                    width={900}
                    height={675}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.tag && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-wider text-primary-foreground shadow-elev2">
                      <Sparkles className="size-3" /> {item.tag}
                    </span>
                  )}
                  {itemQty(item.id) > 0 && (
                    <span className="absolute right-3 top-3 rounded-full bg-fresh px-3 py-1 text-xs font-black text-primary-foreground shadow-elev2">
                      {itemQty(item.id)} selected
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-bold text-brand-green">{item.cat}</div>
                    <div className="text-xs font-bold text-muted-foreground">{item.prep}</div>
                  </div>
                  <h3 className="mt-1 font-brand text-xl font-black">{item.name}</h3>
                  <p className="mt-1.5 min-h-12 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {[item.spice, item.serves, ...item.details.slice(0, 2)].map((detail) => (
                      <span
                        key={detail}
                        className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Best with:{" "}
                    <span className="font-bold text-foreground">{item.pairings.join(", ")}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="font-brand text-2xl font-black text-primary">
                      {formatPrice(item.price)}
                    </div>
                    <QuantityStepper
                      label={item.name}
                      quantity={itemQty(item.id)}
                      onDecrease={() => updateQty(item, itemQty(item.id) - 1)}
                      onIncrease={() => updateQty(item, itemQty(item.id) + 1)}
                    />
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
                src={foodImages.egusi}
                alt="Pounded yam and egusi soup"
                loading="lazy"
                width={1200}
                height={1500}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold text-primary-foreground backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-destructive animate-pulse" /> Kitchen
                  active today
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 space-y-5 lg:order-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Restaurant-ready flow
            </span>
            <h2 className="text-3xl font-black leading-tight text-balance sm:text-5xl">
              Browse, reserve, order on WhatsApp, or checkout online.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              The app now supports quantity-based ordering, customer account gates for online
              checkout, and a complete table reservation request flow.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { n: "2", l: "order routes" },
                { n: "8", l: "menu categories" },
                { n: "3", l: "auth options" },
              ].map((stat) => (
                <div
                  key={stat.l}
                  className="rounded-2xl border border-border bg-card p-4 shadow-elev1"
                >
                  <div className="font-brand text-2xl font-black text-primary sm:text-3xl">
                    {stat.n}
                  </div>
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
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Order Your Way
            </span>
            <h2 className="mt-2 text-3xl font-black text-balance sm:text-5xl">
              Two routes from cart to kitchen
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShoppingBag,
                title: "Add meals",
                desc: "Use quantity steppers to order multiple plates.",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp",
                desc: "Send a structured order to Food Headquarters.",
              },
              {
                icon: Lock,
                title: "Sign in",
                desc: "Online checkout requires an account or Google sign-in.",
              },
              {
                icon: CreditCard,
                title: "Checkout",
                desc: "Proceed to payment review with order details.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-primary-foreground/10"
              >
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

      <section id="reservations" className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Reservations
            </span>
            <h2 className="mt-2 text-3xl font-black text-balance sm:text-5xl">
              Reserve a table before you arrive.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Capture branch, date, time, guest count and occasion details so the restaurant can
              confirm the table.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elev2">
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-xl bg-secondary text-primary">
                <CalendarDays className="size-6" />
              </div>
              <div>
                <h3 className="font-brand text-2xl font-black">Book Food Headquarters</h3>
                <p className="text-sm text-muted-foreground">
                  Dinner, birthday lunch, office meal, or family table.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setReservationOpen(true)}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-black text-primary-foreground shadow-elev2 transition hover:-translate-y-0.5"
            >
              <CalendarDays className="size-5" /> Start Reservation
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-warm p-8 text-primary-foreground shadow-glow sm:p-12 lg:p-16">
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-black uppercase tracking-wider backdrop-blur">
                  <Gift className="size-3" /> Combo Deal
                </span>
                <h2 className="mt-4 text-3xl font-black leading-tight text-balance sm:text-5xl">
                  Lunch combo from {formatPrice(5850)}
                </h2>
                <p className="mt-3 max-w-md text-primary-foreground/90">
                  Add two plates, mix rice and swallow, then choose WhatsApp or online checkout.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const combo = menuItems.find((item) => item.id === "rice-combo");
                    if (combo) updateQty(combo, itemQty(combo.id) + 1);
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 font-black text-primary shadow-elev2 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-foreground"
                >
                  Add Rice Combo <ArrowRight className="size-4" />
                </button>
              </div>
              <div className="hidden lg:block">
                <img
                  src={foodImages.friedRice}
                  alt="Nigerian fried rice combo"
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
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Visit Us
            </span>
            <h2 className="mt-2 text-3xl font-black text-balance sm:text-5xl">
              Two branches across Lagos
            </h2>
            <p className="mt-3 text-muted-foreground">
              Open every day from 7AM to 10PM. Pick the closest branch during checkout.
            </p>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {branches.map((branch) => (
              <div
                key={branch.name}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-elev1 transition-all hover:shadow-elev3"
              >
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
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                        {branch.tag}
                      </span>
                      <h3 className="mt-1 font-brand text-xl font-black">{branch.name}</h3>
                    </div>
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="size-5" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {branch.addr}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <span className="inline-flex items-center gap-1.5 text-foreground/80">
                      <Clock className="size-4 text-primary" /> 7AM - 10PM
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-foreground/80">
                      <Truck className="size-4 text-primary" /> {branch.eta}
                    </span>
                    <a
                      href={`tel:${branch.phone}`}
                      className="inline-flex items-center gap-1.5 text-foreground/80 hover:text-primary"
                    >
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
          <h2 className="text-3xl font-black text-balance sm:text-5xl">
            Hungry? Your cart is ready when you are.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Add meals, choose delivery or pickup, then order on WhatsApp or sign in for online
            checkout.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <ShoppingBag className="size-5" /> Review Cart
            </button>
            <button
              type="button"
              onClick={() => setReservationOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-4 font-bold shadow-elev2 transition hover:-translate-y-0.5"
            >
              <CalendarDays className="size-5" /> Reserve Table
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-charcoal text-primary-foreground/90">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          <div>
            <Logo inverted />
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              Lagos restaurant web ordering concept built around the current Food Headquarters
              experience.
            </p>
            <div className="mt-5 flex gap-2">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="grid size-10 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-primary"
                  aria-label="Food Headquarters social link"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-brand text-lg font-black text-primary-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((label) => (
                <li key={label}>
                  <a
                    href={`#${label.toLowerCase()}`}
                    className="text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-brand text-lg font-black text-primary-foreground">
              Call To Order
            </h4>
            <ul className="space-y-2.5 text-sm">
              {["08118877147", "08182450867", "08149735235"].map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-accent"
                  >
                    <Phone className="size-3.5" /> {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-brand text-lg font-black text-primary-foreground">
              Hours & Address
            </h4>
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

            <div className="h-2 bg-muted">
              <div
                className="h-full bg-gradient-warm transition-all duration-500"
                style={{ width: `${orderProgress}%` }}
              />
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {cart.length === 0 ? (
                <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-8 text-center">
                  <ShoppingBag className="size-12 text-muted-foreground" />
                  <h3 className="mt-4 font-brand text-xl font-black">No meals added yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Use the plus buttons on menu cards to prepare an order.
                  </p>
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
                    <div
                      key={item.id}
                      className="grid grid-cols-[72px_1fr] gap-3 rounded-2xl border border-border bg-card p-3"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="size-[72px] rounded-xl object-cover"
                      />
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {item.cat} · {item.prep} · {item.spice}
                            </p>
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
                          <div className="font-brand text-lg font-black text-primary">
                            {formatPrice(item.price * item.qty)}
                          </div>
                          <QuantityStepper
                            label={item.name}
                            quantity={item.qty}
                            onDecrease={() => updateQty(item, item.qty - 1)}
                            onIncrease={() => updateQty(item, item.qty + 1)}
                          />
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
                        {mode === "Delivery" ? (
                          <Truck className="size-4" />
                        ) : (
                          <Store className="size-4" />
                        )}
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
                      onChange={(event) =>
                        setForm((current) => ({ ...current, name: event.target.value }))
                      }
                      className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-black">Phone</span>
                    <input
                      value={form.phone}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, phone: event.target.value }))
                      }
                      className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                </div>

                {orderMode === "Delivery" && (
                  <label className="block">
                    <span className="mb-2 block text-sm font-black">Delivery address</span>
                    <textarea
                      value={form.address}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, address: event.target.value }))
                      }
                      rows={3}
                      className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                )}

                <label className="block">
                  <span className="mb-2 block text-sm font-black">Order note</span>
                  <input
                    value={form.note}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, note: event.target.value }))
                    }
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
                  <span className="font-bold">
                    {orderMode === "Delivery" ? formatPrice(deliveryFee) : "Pickup"}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 font-brand text-xl font-black">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <a
                  href={cart.length > 0 ? checkoutHref : undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={cart.length === 0}
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-black transition ${cart.length > 0 ? "bg-fresh text-primary-foreground shadow-elev2 hover:-translate-y-0.5" : "pointer-events-none bg-muted text-muted-foreground"}`}
                >
                  <MessageCircle className="size-5" /> WhatsApp
                </a>
                <button
                  type="button"
                  onClick={requireAuthForCheckout}
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-black transition ${cart.length > 0 ? "bg-primary text-primary-foreground shadow-elev2 hover:-translate-y-0.5" : "bg-muted text-muted-foreground"}`}
                >
                  <CreditCard className="size-5" /> Checkout
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {authOpen && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-charcoal/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background p-5 shadow-elev3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-brand text-2xl font-black">
                  {authMode === "signin" ? "Sign in" : "Create account"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Online checkout requires a Food Headquarters account.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAuthOpen(false)}
                className="grid size-9 place-items-center rounded-full hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
              {(["signin", "signup"] as AuthMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setAuthMode(mode)}
                  className={`h-10 rounded-lg text-sm font-black ${authMode === mode ? "bg-card shadow-elev1" : "text-muted-foreground"}`}
                >
                  {mode === "signin" ? "Sign in" : "Sign up"}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-card text-sm font-black shadow-elev1 transition hover:border-primary"
            >
              <span className="grid size-5 place-items-center rounded-full bg-white text-sm font-black text-blue-600">
                G
              </span>
              Continue with Google
            </button>

            <div className="my-4 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or use email{" "}
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-3">
              {authMode === "signup" && (
                <input
                  value={authForm.name}
                  onChange={(event) =>
                    setAuthForm((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Full name"
                  className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
              )}
              <input
                value={authForm.email}
                onChange={(event) =>
                  setAuthForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="Email address"
                type="email"
                className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
              {authMode === "signup" && (
                <input
                  value={authForm.phone}
                  onChange={(event) =>
                    setAuthForm((current) => ({ ...current, phone: event.target.value }))
                  }
                  placeholder="Phone number"
                  className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
              )}
              <input
                value={authForm.password}
                onChange={(event) =>
                  setAuthForm((current) => ({ ...current, password: event.target.value }))
                }
                placeholder="Password"
                type="password"
                className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <button
              type="button"
              onClick={handleEmailAuth}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-black text-primary-foreground shadow-elev2"
            >
              <Lock className="size-5" />{" "}
              {authMode === "signin" ? "Sign in and checkout" : "Create account and checkout"}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Your account keeps checkout details ready for faster future orders.
            </p>
          </div>
        </div>
      )}

      {checkoutOpen && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-charcoal/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-border bg-background p-5 shadow-elev3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-brand text-2xl font-black">
                  {checkoutDone ? "Payment request created" : "Secure checkout"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {user ? `Signed in as ${user.name}` : "Sign in required"} · {cartCount} items
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutOpen(false)}
                className="grid size-9 place-items-center rounded-full hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>

            {checkoutDone ? (
              <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-center">
                <PartyPopper className="mx-auto size-12 text-primary" />
                <h3 className="mt-3 font-brand text-2xl font-black">
                  Order FH-{Date.now().toString().slice(-5)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your online payment request is ready. Food Headquarters can confirm the order and
                  complete the secure payment handoff.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutDone(false);
                    setCheckoutOpen(false);
                    setCart([]);
                    showToast({
                      tone: "success",
                      title: "Order recorded",
                      message: "You can start another order anytime.",
                    });
                  }}
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-black text-primary-foreground"
                >
                  Start another order
                </button>
              </div>
            ) : (
              <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
                <div className="space-y-3">
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <div className="mb-3 flex items-center gap-2 font-black">
                      <ShieldCheck className="size-5 text-fresh" /> Checkout details
                    </div>
                    <div className="space-y-2 text-sm">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between gap-3">
                          <span>
                            {item.qty} x {item.name}
                          </span>
                          <span className="font-bold">{formatPrice(item.qty * item.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
                    <div className="font-black text-foreground">Customer</div>
                    <div className="mt-1">{form.name || user?.name || "Name not supplied"}</div>
                    <div>{form.phone || user?.phone || "Phone not supplied"}</div>
                    <div>
                      {orderMode === "Delivery"
                        ? form.address || "Address not supplied"
                        : "Pickup order"}
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-bold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-bold">
                        {orderMode === "Delivery" ? formatPrice(deliveryFee) : "Pickup"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service</span>
                      <span className="font-bold">{formatPrice(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3 font-brand text-2xl font-black">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(checkoutTotal)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutDone(true);
                      showToast({
                        tone: "success",
                        title: "Checkout ready",
                        message: "Payment handoff prepared.",
                      });
                    }}
                    className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-black text-primary-foreground shadow-elev2"
                  >
                    <CreditCard className="size-5" /> Proceed to payment
                  </button>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Review your order before continuing to the secure online payment step.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {reservationOpen && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-charcoal/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-border bg-background p-5 shadow-elev3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-brand text-2xl font-black">Reserve a table</h2>
                <p className="text-sm text-muted-foreground">
                  Send the restaurant enough detail to confirm your seating.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setReservationOpen(false);
                  setReservationDone(false);
                }}
                className="grid size-9 place-items-center rounded-full hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>

            {reservationDone ? (
              <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-center">
                <CalendarDays className="mx-auto size-12 text-primary" />
                <h3 className="mt-3 font-brand text-2xl font-black">Reservation request ready</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {reservationForm.guests} guests · {reservationForm.branch} ·{" "}
                  {reservationForm.date} at {reservationForm.time}
                </p>
                <a
                  href={`https://wa.me/${brandPhone}?text=${encodeURIComponent(
                    `Hello Food Headquarters, I would like to reserve a table.\nName: ${reservationForm.name}\nPhone: ${reservationForm.phone}\nGuests: ${reservationForm.guests}\nBranch: ${reservationForm.branch}\nDate: ${reservationForm.date}\nTime: ${reservationForm.time}\nOccasion: ${reservationForm.occasion || "N/A"}\nNote: ${reservationForm.note || "N/A"}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-fresh px-5 text-sm font-black text-primary-foreground"
                >
                  <MessageCircle className="size-5" /> Send to WhatsApp
                </a>
              </div>
            ) : (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["name", "Name", "text"],
                  ["phone", "Phone", "tel"],
                  ["date", "Date", "date"],
                  ["time", "Time", "time"],
                  ["guests", "Guests", "number"],
                  ["occasion", "Occasion", "text"],
                ].map(([key, label, type]) => (
                  <label key={key} className="block">
                    <span className="mb-2 block text-sm font-black">{label}</span>
                    <input
                      type={type}
                      value={reservationForm[key as keyof ReservationForm]}
                      onChange={(event) =>
                        setReservationForm((current) => ({ ...current, [key]: event.target.value }))
                      }
                      className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                ))}
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-black">Branch</span>
                  <select
                    value={reservationForm.branch}
                    onChange={(event) =>
                      setReservationForm((current) => ({ ...current, branch: event.target.value }))
                    }
                    className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                  >
                    {branches.map((branch) => (
                      <option key={branch.name}>{branch.name}</option>
                    ))}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-black">Special note</span>
                  <textarea
                    rows={3}
                    value={reservationForm.note}
                    onChange={(event) =>
                      setReservationForm((current) => ({ ...current, note: event.target.value }))
                    }
                    className="w-full resize-none rounded-xl border border-input bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                  />
                </label>
                <button
                  type="button"
                  onClick={confirmReservation}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-sm font-black text-primary-foreground shadow-elev2 sm:col-span-2"
                >
                  <CalendarDays className="size-5" /> Review reservation
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[90] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 animate-float-up rounded-2xl border border-border bg-card p-4 shadow-elev3">
          <div className="flex items-start gap-3">
            <div
              className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                toast.tone === "success"
                  ? "bg-fresh/15 text-fresh"
                  : toast.tone === "warning"
                    ? "bg-primary/15 text-primary"
                    : "bg-secondary text-primary"
              }`}
            >
              {toast.tone === "success" ? (
                <Check className="size-5" />
              ) : (
                <Sparkles className="size-5" />
              )}
            </div>
            <div>
              <div className="font-black">{toast.title}</div>
              <div className="text-sm text-muted-foreground">{toast.message}</div>
            </div>
          </div>
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
