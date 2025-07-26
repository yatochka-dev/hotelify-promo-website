"use server";

import { env } from "~/env";
import { z } from "zod/v4";

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
  const count = data.items.length;
  const schema = z.number();

  const { data: d, success } = schema.safeParse(count);

  if (!success) {
    return 156;
  }

  return d;
}
