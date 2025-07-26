"use client";
import { Spotlight } from "~/components/ui/spotlight-new";
import { Button } from "~/components/ui/button";
import WaitlistModal from "~/components/WaitlistModal";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { unstable_ViewTransition as ViewTransition } from "react";

export default function HomePage() {
  const router = useRouter();
  const explore = async (e: any) => {
    e.preventDefault();
    // await Promise.all([
    //   animate("p", { opacity: 0 }),
    //   animate(".cat", { opacity: 0 }),
    //   animate(".spotlight", { opacity: 0 }),
    // ]);

    router.push("/ps");
  };
  return (
    <main className="bg-grid-white/[0.02] h-[100dvh - 65px]! relative flex w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <Spotlight />

      <div className="z-50 mx-auto flex h-screen max-w-7xl -translate-y-[5%] flex-col items-center justify-center p-4 pt-20 md:pt-0">
        <ViewTransition name={"title"}>
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-6xl font-bold text-transparent md:text-9xl">
            KeyVaro
          </h1>
        </ViewTransition>
        <p className="mx-auto mt-4 max-w-lg text-center text-xl font-normal text-neutral-300">
          Unlock your next stay with a smartphone.
        </p>
        <div className="z-50 mt-8 flex w-full flex-col justify-center gap-4 md:flex-row">
          <WaitlistModal wf={false} />
          <Button
            variant="outline"
            size="lg"
            className="cat cursor-pointer"
            asChild
            onClick={explore}
          >
            <Link href={"/ps"}>Explore</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
