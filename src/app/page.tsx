"use client";
import { Spotlight } from "~/components/ui/spotlight-new";
import { Button } from "~/components/ui/button";
import WaitlistModal from "~/components/WaitlistModal";

export default function HomePage() {
  return (
    <main className="bg-grid-white/[0.02] relative flex h-screen w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <Spotlight />
      <div className="relative z-50 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-6xl font-bold text-transparent md:text-9xl">
          KeyVaro <br />
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-xl font-normal text-neutral-300">
          Unlock your next stay with a smartphone.
        </p>
        <div className="z-50 mt-8 flex w-full justify-center gap-4">
          <WaitlistModal />
          <Button variant="outline" size="lg" className="cursor-pointer">
            Explore
          </Button>
        </div>
      </div>
    </main>
  );
}
