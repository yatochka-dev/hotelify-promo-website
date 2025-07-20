"use client";

import { useState } from "react";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { useAnimate } from "motion/react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "~/components/ui/animated-modal";
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
import saveToWaitlist from "~/lib/saveToWaitlist";
import { waitlistEntry, type WaitlistEntry } from "~/shemas";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export default function WaitlistModal() {
  const [scope, animate] = useAnimate();
  const [title, setTitle] = useState({
    one: "Sign up for",
    two: "KeyVaro",
    three: "Waitlist!",
  });
  const [entered, setEntered] = useState(false);
  const [loading, setLoading] = useState(false);

  // @ts-ignore - react-form types are incompatible
  const form = useForm<WaitlistEntry>({
    defaultValues: {
      name: "",
      email: "",
      type: "Consumer",
    },
    validators: {
      onChange: waitlistEntry,
    },
    // @ts-ignore - library types are not great
    onSubmit: async ({ value, formApi }) => {
      setLoading(true);
      await saveToWaitlist(value);
      setLoading(false);
      formApi.reset();
      async function run() {
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
          { repeat: 10, duration: 0.8, ease: "circInOut" },
        );
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const closeIcon = document.getElementById("close-modal-icon");
        if (closeIcon) closeIcon.click();
        setEntered(true);
      }
      void run();
    },
  });

  return (
    <Modal>
      {entered ? (
        <Button disabled variant="default" size="lg">
          Thank you!
        </Button>
      ) : (
        <ModalTrigger
          className={buttonVariants({
            variant: "destructive",
            size: "lg",
            className: "bg-foreground! text-background!",
          })}
        >
          Enter the Waitlist
        </ModalTrigger>
      )}
      <ModalBody className="mx-8 min-w-[80vw] md:min-w-[45vw]">
        <ModalContent>
          <h4 className="mx-auto mb-8 inline-flex items-center gap-2 text-center text-lg font-bold text-neutral-600 dark:text-neutral-100 md:text-2xl">
            <TextMorph>{title.one}</TextMorph>{" "}
            <span className="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 dark:border-neutral-700 dark:bg-neutral-800">
              <TextMorph>{title.two}</TextMorph>
            </span>{" "}
            <TextMorph>{title.three}</TextMorph>
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
        </ModalContent>
        <ModalFooter className="gap-4">
          <Button
            type="button"
            className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-black dark:border-black dark:bg-black dark:text-white"
            data-close-modal
          >
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit}
            disabled={!form.state.canSubmit || loading || form.state.isSubmitted || entered}
            className="w-28 rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black"
          >
            {loading ? "Submitting..." : entered ? "Thank you!" : "Let's go!"}
          </Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}

