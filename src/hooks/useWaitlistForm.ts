import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import saveToWaitlist from "~/lib/saveToWaitlist";
import { waitlistEntry, type WaitlistEntry } from "~/shemas";

export function useWaitlistForm(options: { onSuccess?: () => Promise<void> | void } = {}) {
  const { onSuccess } = options;
  const [loading, setLoading] = useState(false);
  const [entered, setEntered] = useState(false);

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
        setEntered(true);
        if (onSuccess) await onSuccess();
      }
    },
  });

  return { form, loading, entered };
}
