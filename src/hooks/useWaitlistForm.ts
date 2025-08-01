import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import saveToWaitlist from "~/lib/saveToWaitlist";
import { waitlistEntry, type WaitlistEntry } from "~/shemas";
import { create } from "zustand/react";
import { persist } from "zustand/middleware";

type WaitlistState = {
  entered: boolean;
  enter: () => void;
};

const useWaitlistEntered = create<WaitlistState>()(
  persist(
    (set) => ({
      entered: false,
      enter: () => set({ entered: true }),
    }),
    { name: "entered-the-waitlist" },
  ),
);

export function useWaitlistForm(
  options: { onSuccess?: () => Promise<void> | void } = {},
) {
  const { onSuccess } = options;
  const [loading, setLoading] = useState(false);
  const { entered, enter } = useWaitlistEntered();

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
    onSubmit: async ({ value, formApi }) => {
      setLoading(true);

      const error = await saveToWaitlist(value);
      setLoading(false);
      if (!error) {
        formApi.reset();
        enter();
        if (onSuccess) await onSuccess();
      }
    },
  });

  return { form, loading, entered };
}
