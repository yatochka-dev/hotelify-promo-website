"use client";

import React, { useEffect, useMemo, useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, Mail, Shield, Users, Zap } from "lucide-react";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getCurrentWaitlistCount } from "~/app/_actions";
import { useWaitlistForm } from "~/hooks/useWaitlistForm";
import WaitlistModal, { FieldInfo } from "~/components/WaitlistModal";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { TextMorph } from "~/components/ui/text-morph";

const benefits = [
  {
    icon: Users,
    title: "Early Access",
    description:
      "Be among the first to experience Hotelify's revolutionary platform",
  },
  {
    icon: Zap,
    title: "Priority Support",
    description: "Get dedicated onboarding and priority customer support",
  },
  {
    icon: Shield,
    title: "Exclusive Pricing",
    description: "Lock in special launch pricing with up to 50% off first year",
  },
];

export default function WaitlistSection() {
  const { form, loading, entered } = useWaitlistForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [count, setCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  useEffect(() => {
    async function fetchCount() {
      const c = await getCurrentWaitlistCount();
      setCount(c);
    }
    fetchCount();
  }, []);

  const stats = useMemo(() => {
    return [
      {
        number: `${count}+`,
        label: " Waitlist Entries",
      },
      { number: "50+", label: "Countries Interested" },
      { number: "Q1 2026", label: "Expected Launch" },
    ];
  }, [count]);
  return (
    <section className="bg-background relative flex h-screen items-center overflow-hidden">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="border-foreground bg-foreground text-background rounded-lg border-2 p-3">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-6xl">
              Join the Waitlist
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-foreground/70 mb-12 text-xl leading-relaxed font-light"
          >
            Be the first to transform your hotel operations. Join thousands of
            forward-thinking hoteliers already on our exclusive waitlist.
          </motion.p>

          {/* Benefits */}
          <div className="mb-12 space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group flex items-start gap-4"
              >
                <div className="border-foreground/30 group-hover:bg-foreground group-hover:text-background rounded-lg border p-2 transition-all duration-300">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-foreground mb-1 text-lg font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-foreground mb-1 font-mono text-2xl font-bold md:text-3xl">
                  {stat.number}
                </div>
                <div className="text-foreground/60 text-xs font-medium tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Form */}
        <div className={"block w-full lg:hidden"}>
          <WaitlistModal wf />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="border-foreground/20 bg-background/50 rounded-lg border p-8 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-foreground mb-6 text-center text-2xl font-bold">
                    Reserve Your Spot
                  </h3>

                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      form.handleSubmit();
                    }}
                  >
                    <form.Field name="name">
                      {(fieldApi) => (
                        <div className="field space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={fieldApi.state.value}
                            onChange={(e) =>
                              fieldApi.handleChange(e.target.value)
                            }
                            onBlur={fieldApi.handleBlur}
                          />
                          <FieldInfo field={fieldApi} />
                        </div>
                      )}
                    </form.Field>
                    <form.Field name="email">
                      {(fieldApi) => (
                        <div className="field space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            placeholder="johndoe@example.com"
                            value={fieldApi.state.value}
                            onChange={(e) =>
                              fieldApi.handleChange(e.target.value)
                            }
                            onBlur={fieldApi.handleBlur}
                          />
                          <FieldInfo field={fieldApi} />
                        </div>
                      )}
                    </form.Field>
                    <form.Field name="type">
                      {(fieldApi) => (
                        <div className="field space-y-2">
                          <Label htmlFor="type">Type</Label>
                          <Select
                            value={fieldApi.state.value}
                            onValueChange={(v) =>
                              fieldApi.handleChange(
                                v as "Consumer" | "Business",
                              )
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Type</SelectLabel>
                                <SelectItem value="Consumer">
                                  Consumer
                                </SelectItem>
                                <SelectItem value="Business">
                                  Business
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </form.Field>
                    <Button
                      type="submit"
                      className={"my-3 w-full"}
                      disabled={
                        form.state.isSubmitted ||
                        loading ||
                        form.state.isSubmitting
                      }
                    >
                      <TextMorph>
                        {entered ? "Thank you!" : "Join Waitlist"}
                      </TextMorph>
                    </Button>
                  </form>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="text-foreground/60 mt-4 text-center text-xs"
                  >
                    We respect your privacy. Unsubscribe at any time by sending
                    us an email.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-8 text-center"
                >
                  <div className="bg-foreground text-background mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-foreground mb-2 text-2xl font-bold">
                    You're In!
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    Welcome to the Hotelify waitlist. We'll notify you as soon
                    as we launch.
                  </p>
                  <div className="text-foreground/60 text-sm">
                    Position #{Math.floor(Math.random() * 1000) + 2500} on the
                    waitlist
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="border-foreground/20 absolute -top-4 -right-4 hidden h-8 w-8 rounded-lg border lg:block"
          />
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="border-foreground/20 absolute -bottom-4 -left-4 hidden h-6 w-6 border lg:block"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
        </motion.div>
      </div>

      {/* Background Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            color: "currentColor",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-foreground/20 absolute h-1 w-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </section>
  );
}
