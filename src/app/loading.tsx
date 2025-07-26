import { TextShimmerWave } from "~/components/ui/text-shimmer-wave";

export default function RootLoading() {
  return (
    <div className={"flex h-screen w-screen items-center justify-center"}>
      <TextShimmerWave className="font-mono text-sm" duration={1}>
        Loading...
      </TextShimmerWave>
    </div>
  );
}
