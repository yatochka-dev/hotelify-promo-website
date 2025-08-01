import { TextShimmerWave } from "~/components/ui/text-shimmer-wave";

export default function RootLoading() {
  return (
    <div
      className={"h-[100vh - 65px] flex w-screen items-center justify-center"}
    >
      <TextShimmerWave className="font-mono text-sm" duration={1}>
        Loading...
      </TextShimmerWave>
    </div>
  );
}
