"use client";

import { motion } from "motion/react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  ArrowRight,
} from "lucide-react";
import { unstable_ViewTransition as ViewTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

const problems = [
  {
    icon: Clock,
    title: "Inefficient Check-in Process",
    description:
      "Guests wait 15+ minutes at reception, creating bottlenecks and poor first impressions that damage brand reputation",
    stat: "15+ min wait times",
  },
  {
    icon: DollarSign,
    title: "Missed Revenue Opportunities",
    description:
      "Hotels lose $50-200 per guest in potential upsells due to manual, inconsistent processes and lack of personalization",
    stat: "$50-200 lost per guest",
  },
  {
    icon: Users,
    title: "Fragmented Guest Experience",
    description:
      "Disconnected systems create confusion and frustration, leading to 30% lower guest satisfaction scores",
    stat: "30% lower satisfaction",
  },
];

const solutions = [
  {
    icon: CheckCircle,
    title: "Instant Digital Check-in",
    description:
      "Guests check-in via mobile app in under 2 minutes, eliminating queues and creating seamless arrivals",
    stat: "<2 min check-in",
  },
  {
    icon: CheckCircle,
    title: "AI-Powered Upselling",
    description:
      "Automated personalized offers increase ancillary revenue by 35% through intelligent recommendations",
    stat: "35% revenue increase",
  },
  {
    icon: CheckCircle,
    title: "Unified Guest Journey",
    description:
      "Seamless integration across all touchpoints creates memorable experiences and builds loyalty",
    stat: "95% satisfaction",
  },
];

export default function ProblemSolutionSection() {
  const router = useRouter();
  function handleArrowClick() {
    router.push("/features");
  }

  return (
    <section className="bg-background relative flex items-center overflow-x-hidden overflow-y-scroll lg:h-screen">
      <Button
        variant={"default"}
        size={"lg"}
        className={
          "fixed right-4 bottom-4 z-[100] flex cursor-pointer lg:hidden"
        }
        onClick={handleArrowClick}
      >
        Continue Exploring {"->"}
      </Button>
      <div className="mx-auto grid scale-90 items-center gap-16 px-3 lg:grid-cols-2 lg:gap-40 lg:px-6">
        {/* Problems */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12 flex items-center gap-4">
            <div className="border-foreground rounded-lg border-2 p-3">
              <AlertTriangle className="text-foreground h-6 w-6" />
            </div>
            <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
              Without KeyVaro
            </h2>
          </div>

          <div className="space-y-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                }}
                className="group border-foreground/20 hover:border-foreground/40 bg-background/50 rounded-lg border p-3 backdrop-blur-sm transition-all duration-300 md:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="border-foreground/30 group-hover:border-foreground/60 rounded-lg border p-2 transition-colors">
                    <problem.icon className="text-foreground h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-foreground text-xl font-semibold">
                        {problem.title}
                      </h3>
                      <span className="text-foreground/60 bg-foreground/5 rounded px-2 py-1 font-mono text-sm">
                        {problem.stat}
                      </span>
                    </div>
                    <p className="text-foreground/70 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 flex-col lg:flex"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              borderRadius: ["50%", "40%", "50%"],
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            whileHover={{
              scale: 0.9,
              transition: {
                duration: 0.4,
              },
            }}
            onClick={handleArrowClick}
            className="border-foreground bg-background hover:bg-foreground/10 cursor-pointer rounded-full border-2 p-4 duration-300"
          >
            <ArrowRight className="text-foreground h-8 w-8" />
          </motion.div>
          <span
            className={
              "text-muted-foreground mt-4 translate-y-1/2 rotate-[270deg]"
            }
          >
            click {"->"}
          </span>
        </motion.div>

        {/* Solutions */}
        <div>
          <div className="mb-12 flex items-center gap-4">
            <div className="border-foreground bg-foreground text-background rounded-lg border-2 p-3">
              <CheckCircle className="h-6 w-6" />
            </div>
            <ViewTransition name={"title"}>
              <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
                KeyVaro
              </h1>
            </ViewTransition>
          </div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          >
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.15,
                  type: "spring",
                }}
                className="group border-foreground/20 hover:border-foreground/40 bg-background/50 rounded-lg border p-6 backdrop-blur-sm transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-foreground text-background rounded-lg p-2">
                    <solution.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-foreground text-xl font-semibold">
                        {solution.title}
                      </h3>
                      <span className="text-background bg-foreground rounded px-2 py-1 font-mono text-sm">
                        {solution.stat}
                      </span>
                    </div>
                    <p className="text-foreground/70 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
            className="border-foreground bg-foreground/5 mt-10 rounded-lg border-2 p-4 md:p-6"
          >
            <h3 className="text-foreground mb-3 text-xl font-semibold">
              The Result
            </h3>
            <p className="text-foreground/80 text-lg leading-relaxed">
              Hotels using Hotelify see an average of{" "}
              <span className="text-foreground font-bold">
                25% increase in revenue
              </span>
              ,{" "}
              <span className="text-foreground font-bold">
                40% reduction in operational costs
              </span>
              , and{" "}
              <span className="text-foreground font-bold">
                95% guest satisfaction
              </span>{" "}
              scores.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
            color: "currentColor",
          }}
        />
      </div>
    </section>
  );
}
