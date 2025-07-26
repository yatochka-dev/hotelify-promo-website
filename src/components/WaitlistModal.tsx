"use client";

import { useState } from "react";
import { type AnyFieldApi } from "@tanstack/react-form";
import { useAnimate } from "motion/react";

import { Button, buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { TextMorph } from "~/components/ui/text-morph";
import { useWaitlistForm } from "~/hooks/useWaitlistForm";
import { cn } from "~/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "~/components/ui/dialog";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <span>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className={"text-destructive"}>
          {field.state.meta.errors.map((e) => e.message).join(", ")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </span>
  );
}

export default function WaitlistModal({
  wf,
  small = false,
}: {
  wf: boolean;
  small?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const [title, setTitle] = useState({
    one: "Sign up for",
    two: "KeyVaro",
    three: "Waitlist!",
  });

  async function playSuccessAnimation() {
    setTitle({ one: "Thanks for", two: "Joining", three: "KeyVaro!" });
    await animate(
      ".field",
      { opacity: 0, y: -20, userSelect: "none", pointerEvents: "none" },
      { duration: 0.3, delay: (i) => i * 0.1 },
    );
    await animate("#heart", { opacity: 1 });
    await animate(
      "#heart",
      { scale: [1, 1.2, 1] },
      { repeat: 7, duration: 0.8, ease: "circInOut" },
    );
    setOpen(false);
  }

  const { form, loading, entered } = useWaitlistForm({
    onSuccess: playSuccessAnimation,
  });

  return (
    <>
      {entered ? (
        <Button
          disabled
          variant="default"
          size={small ? "sm" : "lg"}
          className={"cat"}
        >
          Thank you!
        </Button>
      ) : (
        <Button
          className={buttonVariants({
            variant: "destructive",
            size: small ? "sm" : "lg",
            className: cn(
              "bg-foreground! text-background! cat cursor-pointer",
              wf && "w-full",
            ),
          })}
          variant={"destructive"}
          size={small ? "sm" : "lg"}
          onClick={() => setOpen(true)}
          disabled={loading || entered}
        >
          Enter the Waitlist
        </Button>
      )}

      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogContent className={"mx-8 min-w-[80vw] md:min-w-[45vw]"}>
          <DialogTitle className={"text-center"}>
            <h4 className="mx-auto mb-8 hidden items-center gap-2 text-center text-lg font-bold text-neutral-600 md:inline-flex md:text-2xl dark:text-neutral-100">
              <TextMorph>{title.one}</TextMorph>{" "}
              <span className="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 dark:border-neutral-700 dark:bg-neutral-800">
                <TextMorph>{title.two}</TextMorph>
              </span>{" "}
              <TextMorph>{title.three}</TextMorph>
            </h4>
          </DialogTitle>
          <h4
            className={
              "my-2 inline gap-2 text-center text-[17px] font-bold text-neutral-600 md:hidden md:text-2xl dark:text-neutral-100"
            }
          >
            <TextMorph>{`${title.one} ${title.two} ${title.three}`}</TextMorph>
          </h4>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            ref={scope}
          >
            <span
              className="absolute right-1/2 bottom-1/2 -z-10 translate-x-1/2 translate-y-1/2 text-9xl opacity-0"
              id="heart"
            >
              🩷
            </span>
            <form.Field name="name">
              {(fieldApi) => (
                <div className="field space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={fieldApi.state.value}
                    onChange={(e) => fieldApi.handleChange(e.target.value)}
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
                    onChange={(e) => fieldApi.handleChange(e.target.value)}
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
                      fieldApi.handleChange(v as "Consumer" | "Business")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="Consumer">Consumer</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
          </form>
          <DialogFooter className="flex flex-row! gap-4">
            <Button
              type="button"
              className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-black dark:border-black dark:bg-black dark:text-white"
              data-close-modal
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit}
              disabled={
                !form.state.canSubmit ||
                loading ||
                form.state.isSubmitted ||
                entered
              }
              className="w-28 rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black"
            >
              {loading ? "Submitting..." : entered ? "Thank you!" : "Let's go!"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
