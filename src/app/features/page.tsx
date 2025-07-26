"use client";

import { motion } from "motion/react";
import {
  Smartphone,
  Key,
  TrendingUp,
  MessageSquare,
  Shield,
  Zap,
  CreditCard,
  Bell,
  BarChart3,
} from "lucide-react";
import {
  unstable_ViewTransition as ViewTransition,
  useEffect,
  useState,
} from "react";
import { Button } from "~/components/ui/button";
import { TextMorph } from "~/components/ui/text-morph";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIsMobile } from "~/hooks/useMobile";

const features = [
  {
    icon: Smartphone,
    title: "Mobile Check-in/Out",
    description:
      "Guests can check-in remotely, skip the front desk, and access their room instantly through our mobile app",
  },
  {
    icon: Key,
    title: "Digital Room Keys",
    description:
      "Secure mobile keys eliminate plastic cards and provide seamless room access with advanced encryption",
  },
  {
    icon: TrendingUp,
    title: "Automated Upselling",
    description:
      "AI-driven recommendations increase ancillary revenue through personalized offers and smart timing",
  },
  {
    icon: MessageSquare,
    title: "Guest Communication",
    description:
      "Real-time messaging platform for instant guest support and service requests with 24/7 availability",
  },
  {
    icon: CreditCard,
    title: "Contactless Payments",
    description:
      "Secure, frictionless payment processing for all hotel services and amenities with multiple options",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Proactive alerts for room readiness, special offers, and important updates delivered at optimal times",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Comprehensive insights into guest behavior, revenue patterns, and operational efficiency metrics",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and compliance with hospitality industry standards including PCI DSS",
  },
  {
    icon: Zap,
    title: "PMS Integration",
    description:
      "Seamless integration with existing property management systems and third-party tools via robust APIs",
  },
];

export default function FeaturesSection() {
  const isMobile = useIsMobile();
  const p = [
    "Continue ->",
    "Go to the next page ->",
    "Explore ->",
    "Join the waitlist ->",
  ];
  const [c, setContinue] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setContinue((d) => (d + 1) % p.length);
    }, 3000);
  }, []);

  const router = useRouter();
  function handleContinueClick(e: any) {
    e.preventDefault();
    router.push("/waitlist");
  }

  return (
    <section className="bg-background relative flex items-center">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-3 py-16 pb-30 md:px-6 lg:py-30">
        <motion.div className="text-center">
          <h1 className="text-foreground md:text-6x md:blockl mb-6 hidden items-center justify-center gap-2 text-center text-2xl font-bold tracking-tight sm:text-3xl lg:flex">
            Powerful Features that
            <span
              className={
                "inline-flex rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 dark:border-neutral-700 dark:bg-neutral-800"
              }
            >
              <ViewTransition name={"title"}>
                <h1>KeyVaro</h1>
              </ViewTransition>{" "}
            </span>
            offers.
          </h1>
          <h1
            className={
              "text-foreground md:text-6x md:blockl mb-6 flex items-center justify-center gap-2 text-center text-3xl font-bold tracking-tight md:hidden"
            }
          >
            Powerful Features that span Offers
          </h1>
          <p className="text-foreground/70 mx-auto max-w-3xl text-lg font-light md:text-xl">
            Everything you need to create exceptional guest experiences while
            optimizing operations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group border-foreground/20 hover:border-foreground/40 bg-background/50 relative rounded-lg border p-6 backdrop-blur-sm transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="border-foreground/30 group-hover:bg-foreground group-hover:text-background rounded-lg border p-3 transition-all duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground group-hover:text-foreground mb-3 text-xl font-semibold transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="group-hover:border-foreground/20 pointer-events-none absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/*<motion.div*/}
        {/*  initial={{ opacity: 0, y: 30 }}*/}
        {/*  animate={{ opacity: 1, y: 0 }}*/}
        {/*  transition={{ duration: 0.8, delay: 1 }}*/}
        {/*  className="mt-12 text-center"*/}
        {/*>*/}
        {/*  <div className="border-foreground/20 bg-background/50 inline-flex items-center gap-3 rounded-full border px-6 py-3 backdrop-blur-sm">*/}
        {/*    <Zap className="text-foreground h-5 w-5" />*/}
        {/*    <span className="text-foreground font-medium">*/}
        {/*      All features work seamlessly together*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*</motion.div>*/}
      </div>

      <div
        className={
          "text-foreground fixed right-10 bottom-10 text-lg font-semibold"
        }
      >
        <Button
          variant={isMobile ? "default" : "ghost"}
          asChild
          onClick={handleContinueClick}
        >
          <Link href="/waitlist">
            <TextMorph children={p[c] ?? "Continue ->"} />
          </Link>
        </Button>
      </div>

      {/* Floating Geometric Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>
    </section>
  );
}
