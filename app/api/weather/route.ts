import { NextResponse } from "next/server";
import { contact } from "@/data/prash/about";

export const runtime = "nodejs";

export async function GET() {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Weather service is not configured" },
      { status: 503 },
    );
  }

  const { lat, lng: lon } = contact.location.coordinates;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 1800 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Weather service is unavailable" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const result = {
      name: data.name,
      timezone: data.timezone,
      weather: data.weather?.[0]
        ? {
            main: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          }
        : null,
      main: {
        temp: data.main?.temp,
        feelsLike: data.main?.feels_like,
        humidity: data.main?.humidity,
      },
    };

    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, max-age=60, s-maxage=1800, stale-while-revalidate=600" },
    });
  } catch {
    return NextResponse.json(
      { error: "Weather service is unavailable" },
      { status: 502 },
    );
  }
}
