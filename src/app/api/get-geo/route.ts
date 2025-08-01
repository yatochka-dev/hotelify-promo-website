import { geolocation } from "@vercel/functions";

export function GET(request: Request) {
  const { country } = geolocation(request);

  if (!country) {
    return new Response(`{}`, {
      headers: {
        contentType: "application/json",
      },
      status: 500,
    });
  }

  return new Response(JSON.stringify({ country }), {
    headers: { "content-type": "application/json" },
  });
}
