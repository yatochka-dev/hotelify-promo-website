import { useState } from "react";
import z from "zod/v4";
import { env } from "~/env";
import type { waitlistEntry } from "~/shemas";

type Fields = "name" | "email" | "type";
async function getCountry(): Promise<string | undefined> {
  try {
    const res = await fetch("/api/get-geo");
    const data = (await res.json()) as { country: string };
    return data["country"];
  } catch (_) {
    return undefined;
  }
}

export default async function saveToWaitlist(
  entry: z.infer<typeof waitlistEntry>,
) {
  const country = await getCountry();

  const response = await fetch(
    env.NEXT_PUBLIC_BACKEND_URL + "/api/collections/waitlists/records",
    {
      method: "POST",
      body: JSON.stringify({
        ...entry,
        country: country,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (response.status !== 200) {
    const json = data as {
      message: string;
      data: Record<Fields, Record<string, { code: string; message: string }>>;
    };
    const res: Record<string, string> = {};

    for (const [key, value] of Object.entries(json.data)) {
      // @ts-ignore
      res[key] = [value.code];
    }

    return res;
  }

  return null;
}
