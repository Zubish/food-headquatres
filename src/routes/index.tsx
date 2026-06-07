import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu, X, Star, ShoppingBag, Phone, MessageCircle, MapPin, Clock,
  Truck, Store, PhoneCall, ChevronRight, Flame, Leaf, Award, Heart,
  Instagram, Facebook, Twitter, ArrowRight
} from "lucide-react";

import heroJollof from "@/assets/hero-jollof.jpg";
import mealEgusi from "@/assets/meal-egusi.jpg";
import mealFriedRice from "@/assets/meal-friedrice.jpg";
import mealSuya from "@/assets/meal-suya.jpg";
import mealPastry from "@/assets/meal-pastry.jpg";
import mealDrink from "@/assets/meal-drink.jpg";
import mealPeppersoup from "@/assets/meal-peppersoup.jpg";
import chefKitchen from "@/assets/chef-kitchen.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Food HQ — Experience Great Taste | Nigerian Meals in Lagos" },
      { name: "description", content: "Food Headquarters Lagos — fresh Nigerian meals delivered fast. Order jollof rice, swallow, suya & more from Ikeja & Fadeyi branches. Open 7AM–10PM daily." },
      { property: "og:title", content: "Food HQ — Experience Great Taste" },
      { property: "og:description", content: "Fresh Nigerian meals delivered fast across Lagos. Order online, by phone, or WhatsApp." },
      { property: "og:image", content: heroJollof },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

const meals = [
  { img: heroJollof, name: "Jollof Rice & Chicken", cat: "Rice Meals", desc: "Smoky party jollof, grilled chicken, plantain, coleslaw.", price: "₦4,500", tag: "Best Seller" },
  { img: mealEgusi, name: "Egusi & Pounded Yam", cat: "Swallow & Soup", desc: "Rich melon soup with assorted meat & smooth pounded yam.", price: "₦5,200" },
  { img: mealFriedRice, name: "Fried Rice Combo", cat: "Rice Meals", desc: "Aromatic fried rice with grilled chicken & plantain.", price: "₦4,200" },
  { img: mealSuya, name: "Beef Suya Platter", cat: "Proteins", desc: "Spicy grilled beef skewers, onions, fresh pepper.", price: "₦3,800", tag: "Hot" },
  { img: mealPeppersoup, name: "Catfish Pepper Soup", cat: "Swallow & Soup", desc: "Warm, spicy broth with fresh catfish & fragrant herbs.", price: "₦4,800" },
  { img: mealPastry, name: "Meat Pie & Puff Puff", cat: "Pastries", desc: "Flaky, buttery pies with seasoned beef filling.", price: "₦1,500" },
  { img: mealDrink, name: "Chapman Cooler", cat: "Drinks", desc: "Lagos-style chapman, citrus & berry blend, ice cold.", price: "₦1,800" },
];

const categories = ["All", "Rice Meals", "Swallow & Soup", "Proteins", "Pastries", "Drinks"];

function Landing() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCat, setActiveCat] = useState("All");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = activeCat === "All" ? meals : meals.filter(m => m.cat === activeCat);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-lg shadow-elev1" : "bg-transparent"}`}>
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="size-10 rounded-2xl bg-gradient-warm grid place-items-center shadow-elev2">
              <Flame className="size-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-base sm:text-lg">Food HQ</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:block">Experience Great Taste</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {["Home", "Menu", "Branches", "Delivery", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors">{l}</a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href="#menu" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-elev2 hover:shadow-glow hover:-translate-y-0.5 transition-all ripple">
              <ShoppingBag className="size-4" /> Order Now
            </a>
            <button onClick={() => setNavOpen(!navOpen)} className="lg:hidden size-10 grid place-items-center rounded-full hover:bg-muted">
              {navOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {navOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border animate-float-up">
            <div className="px-4 py-4 flex flex-col gap-1">
              {["Home", "Menu", "Branches", "Delivery", "Contact"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setNavOpen(false)} className="px-4 py-3 rounded-2xl text-sm font-medium hover:bg-muted">{l}</a>
              ))}
              <a href="#menu" onClick={() => setNavOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold">
                <ShoppingBag className="size-4" /> Order Now
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-[100svh] flex items-end overflow-hidden">
        <img src={heroJollof} alt="Smoky Nigerian jollof rice with grilled chicken" className="absolute inset-0 w-full h-full object-cover animate-shimmer" width={1600} height={1200} />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 pb-12 sm:pb-20 pt-32 text-primary-foreground">
          <div className="max-w-2xl space-y-6 animate-float-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 px-4 py-1.5 text-xs font-medium">
              <span className="size-2 rounded-full bg-fresh animate-pulse" /> Open today · 7AM – 10PM
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-balance">
              Experience<br />
              <span className="bg-gradient-to-r from-accent to-primary-foreground bg-clip-text text-transparent">Great Taste.</span>
            </h1>
            <p className="text-base sm:text-lg text-primary-foreground/90 max-w-lg leading-relaxed">
              Fresh Nigerian meals from Lagos' most-loved kitchen — delivered hot to your door, ready for pickup, or served in-store.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#menu" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-semibold shadow-glow hover:-translate-y-0.5 transition-all ripple">
                <ShoppingBag className="size-5" /> Order Now <ArrowRight className="size-4" />
              </a>
              <a href="#menu" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/30 px-6 py-3.5 font-semibold hover:bg-primary-foreground/20 transition-colors">
                View Menu
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-accent text-accent" />)}</div>
                <span className="font-semibold">4.6</span>
                <span className="text-primary-foreground/70">· 2,400+ reviews</span>
              </div>
              <div className="h-4 w-px bg-primary-foreground/30" />
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Truck className="size-4" /> 30-min delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Award, label: "4.6★ Rated", sub: "by 2,400+ diners" },
            { icon: Truck, label: "Fast Delivery", sub: "30 min average" },
            { icon: Leaf, label: "Fresh Daily", sub: "Made to order" },
            { icon: Heart, label: "Loved in Lagos", sub: "Since 2018" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="size-11 rounded-2xl bg-secondary grid place-items-center text-primary shrink-0">
                <Icon className="size-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">Featured Meals</span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold text-balance">What's hot in our kitchen</h2>
            </div>
            <a href="#menu" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              See full menu <ChevronRight className="size-4" />
            </a>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap mb-8">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCat(c)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium border transition-all ${activeCat === c ? "bg-primary text-primary-foreground border-primary shadow-elev2" : "bg-card text-foreground border-border hover:border-primary/40"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((m, i) => (
              <article key={m.name} className="group rounded-3xl bg-card shadow-elev1 hover:shadow-elev3 transition-all hover:-translate-y-1 overflow-hidden border border-border/50 animate-float-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={m.img} alt={m.name} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {m.tag && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-elev2">
                      <Flame className="size-3" /> {m.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-xs text-muted-foreground font-medium">{m.cat}</div>
                  <h3 className="mt-1 font-display font-bold text-lg">{m.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="font-display font-bold text-xl text-primary">{m.price}</div>
                    <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-sm font-semibold hover:bg-primary transition-colors ripple">
                      <ShoppingBag className="size-4" /> Order
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CHEF STORY */}
      <section className="py-16 sm:py-24 bg-gradient-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elev3">
              <img src={chefKitchen} alt="Food HQ chef plating a fresh meal" loading="lazy" width={1400} height={1000} className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 px-3 py-1.5 text-xs text-primary-foreground font-medium">
                  <span className="size-1.5 rounded-full bg-destructive animate-pulse" /> Live from our kitchen
                </div>
              </div>
            </div>
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-elev3 p-5 max-w-xs border border-border">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-fresh/15 grid place-items-center">
                  <Leaf className="size-6 text-fresh" />
                </div>
                <div>
                  <div className="font-display font-bold">100% Fresh</div>
                  <div className="text-xs text-muted-foreground">Sourced locally, daily</div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-5">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">Our Kitchen Story</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-balance leading-tight">
              Prepared Fresh.<br />Served With Great Taste.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every meal at Food HQ begins long before it lands on your plate — with carefully selected ingredients from local Lagos markets, recipes passed down through generations, and chefs who treat each order like it's their own family meal.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From our smoky party jollof to the perfect pounded yam, we cook the way you remember — with patience, pride, and a whole lot of pepper.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { n: "7+", l: "Years serving Lagos" },
                { n: "50k+", l: "Happy customers" },
                { n: "2", l: "Branches & growing" },
              ].map(s => (
                <div key={s.l} className="rounded-2xl bg-card border border-border p-4 shadow-elev1">
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-primary">{s.n}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">Loved by Lagos</span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold text-balance">What our customers are saying</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
            {[
              { name: "Adaeze O.", role: "Ikeja", text: "Best jollof in Lagos, hands down. Delivery was hot and arrived in under 25 minutes. I'm a repeat customer for life." },
              { name: "Tunde A.", role: "Yaba", text: "Their egusi reminds me of my mum's cooking. Quality is consistent every single time — that's what keeps me coming back." },
              { name: "Chiamaka E.", role: "Surulere", text: "Ordered for an office lunch of 20 people. Everyone raved. Food HQ is now our official catering plug." },
            ].map(t => (
              <div key={t.name} className="rounded-3xl bg-card border border-border p-6 sm:p-7 shadow-elev1 hover:shadow-elev2 transition-shadow">
                <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-accent text-accent" />)}</div>
                <p className="text-foreground/90 leading-relaxed">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3 pt-5 border-t border-border">
                  <div className="size-10 rounded-full bg-gradient-warm grid place-items-center text-primary-foreground font-bold">{t.name[0]}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER OPTIONS */}
      <section id="delivery" className="py-16 sm:py-24 bg-charcoal text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">Order Your Way</span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold text-balance">Four easy ways to eat with us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { icon: Truck, title: "Delivery", desc: "Hot to your door in 30 min", cta: "Order delivery" },
              { icon: Store, title: "Pickup", desc: "Skip the wait, grab & go", cta: "Order pickup" },
              { icon: PhoneCall, title: "Call Order", desc: "Speak to our team direct", cta: "Call 08118877147" },
              { icon: MessageCircle, title: "WhatsApp", desc: "Chat & order in seconds", cta: "Open WhatsApp" },
            ].map(o => (
              <a key={o.title} href="#contact" className="group rounded-3xl bg-primary-foreground/5 backdrop-blur border border-primary-foreground/10 p-6 hover:bg-primary-foreground/10 hover:-translate-y-1 transition-all">
                <div className="size-14 rounded-2xl bg-gradient-warm grid place-items-center shadow-glow">
                  <o.icon className="size-6 text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-display font-bold text-xl">{o.title}</h3>
                <p className="mt-1.5 text-sm text-primary-foreground/70">{o.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                  {o.cta} <ArrowRight className="size-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-warm p-8 sm:p-12 lg:p-16 text-primary-foreground shadow-glow">
            <div className="absolute -right-20 -top-20 size-80 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-charcoal/20 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  <Flame className="size-3" /> Combo Deal
                </span>
                <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-tight text-balance">
                  Lunch combo + drink for ₦4,500
                </h2>
                <p className="mt-3 text-primary-foreground/90 max-w-md">
                  Choose any rice meal, add a protein and a chilled drink. Available daily, 12PM – 4PM at both branches.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#menu" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground text-primary px-6 py-3 font-bold shadow-elev2 hover:-translate-y-0.5 transition-transform ripple">
                    Claim deal <ArrowRight className="size-4" />
                  </a>
                  <a href="#menu" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 font-semibold hover:bg-primary-foreground/10 transition-colors">
                    See all specials
                  </a>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <img src={mealFriedRice} alt="Lunch combo" className="rounded-3xl shadow-elev3 aspect-square object-cover" loading="lazy" width={600} height={600} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section id="branches" className="py-16 sm:py-24 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">Visit Us</span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold text-balance">Two branches across Lagos</h2>
            <p className="mt-3 text-muted-foreground">Open every day from 7AM to 10PM. Walk in, call ahead, or order online — we're ready for you.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {[
              { name: "Ikeja (Headquarters)", addr: "7 Olowu Street, Allen, Ikeja, Lagos", phone: "08118877147", tag: "Flagship" },
              { name: "Fadeyi Branch", addr: "76 Ikorodu Road, beside Fidelity Bank, Fadeyi BRT Bus Stop, Lagos", phone: "08182450867", tag: "New" },
            ].map(b => (
              <div key={b.name} className="group rounded-3xl bg-card border border-border shadow-elev1 hover:shadow-elev3 transition-all overflow-hidden">
                <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                  <iframe
                    title={b.name}
                    className="absolute inset-0 w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(b.addr)}&output=embed`}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{b.tag}</span>
                      <h3 className="font-display font-bold text-xl mt-1">{b.name}</h3>
                    </div>
                    <div className="size-11 rounded-2xl bg-primary/10 grid place-items-center text-primary shrink-0">
                      <MapPin className="size-5" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.addr}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <span className="inline-flex items-center gap-1.5 text-foreground/80"><Clock className="size-4 text-primary" /> 7AM – 10PM</span>
                    <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1.5 text-foreground/80 hover:text-primary"><Phone className="size-4 text-primary" /> {b.phone}</a>
                  </div>
                  <div className="mt-5 flex gap-2">
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.addr)}`} target="_blank" rel="noreferrer"
                       className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:shadow-elev2 transition-all ripple">
                      <MapPin className="size-4" /> Get Directions
                    </a>
                    <a href={`tel:${b.phone}`} className="size-11 grid place-items-center rounded-full border border-border hover:bg-muted">
                      <Phone className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-balance">Hungry? We're 30 minutes away.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Order now and taste why Lagos calls us Food HQ.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#menu" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 font-semibold shadow-glow hover:-translate-y-0.5 transition-transform ripple">
              <ShoppingBag className="size-5" /> Start Your Order
            </a>
            <a href="https://wa.me/2348118877147" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-fresh text-primary-foreground px-7 py-4 font-semibold shadow-elev2 hover:-translate-y-0.5 transition-transform">
              <MessageCircle className="size-5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal text-primary-foreground/90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="size-10 rounded-2xl bg-gradient-warm grid place-items-center"><Flame className="size-5 text-primary-foreground" /></div>
              <div>
                <div className="font-display font-extrabold text-lg text-primary-foreground">Food HQ</div>
                <div className="text-[10px] uppercase tracking-widest text-primary-foreground/60">Experience Great Taste</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">Lagos' favorite Nigerian kitchen — serving fresh meals daily across Ikeja and Fadeyi.</p>
            <div className="mt-5 flex gap-2">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="size-10 grid place-items-center rounded-full bg-primary-foreground/10 hover:bg-primary transition-colors">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {["Home", "Menu", "Branches", "Delivery", "Contact"].map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="text-primary-foreground/70 hover:text-accent transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Call To Order</h4>
            <ul className="space-y-2.5 text-sm">
              {["08118877147", "08182450867", "08149735235"].map(p => (
                <li key={p}><a href={`tel:${p}`} className="text-primary-foreground/70 hover:text-accent inline-flex items-center gap-2"><Phone className="size-3.5" /> {p}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Hours & Address</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li className="flex gap-2"><Clock className="size-4 shrink-0 mt-0.5 text-accent" /> 7AM – 10PM Daily</li>
              <li className="flex gap-2"><MapPin className="size-4 shrink-0 mt-0.5 text-accent" /> 7 Olowu Street, Allen, Ikeja</li>
              <li className="flex gap-2"><MapPin className="size-4 shrink-0 mt-0.5 text-accent" /> 76 Ikorodu Road, Fadeyi</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-wrap justify-between items-center gap-3 text-xs text-primary-foreground/60">
            <div>© {new Date().getFullYear()} Food Headquarters. All rights reserved.</div>
            <div>Made with <Heart className="inline size-3 fill-primary text-primary" /> in Lagos</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
