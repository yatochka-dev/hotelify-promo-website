"use server";

import { env } from "~/env";

export async function getCurrentWaitlistCount() {
  const res = await fetch(
    env.NEXT_PUBLIC_BACKEND_URL + "/api/collections/waitlists/records",
    {
      headers: {
        Authorization: `${env.AUTH_TOKEN}`,
      },
    },
  );

  const data = (await res.json()) as { items: any[] };
  return data.items.length;
}
