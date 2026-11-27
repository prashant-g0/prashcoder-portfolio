"use client";

import Image from "next/image";
import { CloudSun, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { contact } from "@/data/prash/about";

type WeatherResult = {
  name?: string;
  timezone?: number;
  weather?: { main: string; description: string; icon: string } | null;
  main?: { temp: number; feelsLike?: number; humidity?: number };
};

function timezoneFromLocation(): string {
  const { lat, lng } = contact.location.coordinates;
  if (lat >= 18.8 && lat <= 19.4 && lng >= 72.7 && lng <= 73.1)
    return "Asia/Kolkata";
  return "Asia/Kolkata";
}

function contextualMessage(
  hour: number,
  weatherMain?: string,
  temp?: number,
): string {
  const condition = weatherMain?.toLowerCase();
  if (hour >= 0 && hour < 5) return "Still awake? The commits are waiting.";
  if (hour < 9) return "Coffee hours are in effect.";
  if (condition?.includes("rain") || condition?.includes("drizzle"))
    return "A little rain, a lot of debugging.";
  if (typeof temp === "number" && temp >= 32)
    return "It's warm out. Stay cool and keep shipping.";
  if (hour >= 22) return "Late build, quiet tabs, good progress.";
  if (condition?.includes("clear"))
    return "Sunny outside. The browser tab is not.";
  return "The weather is doing its thing. So are the builds.";
}

export default function ContextWidget() {
  const timezone = timezoneFromLocation();
  const [now, setNow] = useState<Date | null>(null);
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [weatherState, setWeatherState] = useState<
    "loading" | "ready" | "error"
  >("loading");

  useEffect(() => {
    const initialTimer = window.setTimeout(() => setNow(new Date()), 0);
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadWeather = async () => {
      try {
        const response = await fetch("/api/weather", { cache: "no-store" });
        if (!response.ok) throw new Error("Weather unavailable");
        const data = (await response.json()) as WeatherResult;
        if (!cancelled) {
          setWeather(data);
          setWeatherState("ready");
        }
      } catch {
        if (!cancelled) setWeatherState("error");
      }
    };

    loadWeather();
    const timer = window.setInterval(loadWeather, 30 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const timeParts = now
    ? new Intl.DateTimeFormat("en-IN", {
        timeZone: timezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).formatToParts(now)
    : null;

  const time =
    timeParts
      ?.filter((part) => part.type !== "dayPeriod")
      .map((part) => part.value)
      .join("") ?? "--:--";
  const dayPeriod =
    timeParts?.find((part) => part.type === "dayPeriod")?.value ?? "";
  const hour = now
    ? Number(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: timezone,
          hour: "numeric",
          hourCycle: "h23",
        }).format(now),
      )
    : 12;
  const message = contextualMessage(
    hour,
    weather?.weather?.main,
    weather?.main?.temp,
  );

  return (
    <aside
      className="context-widget"
      aria-label={`Current time and weather in ${contact.location.city}`}
    >
      <div className="context-widget-time">
        <strong>{time}</strong>
        {dayPeriod ? <span>{dayPeriod}</span> : null}
      </div>

      <div className="context-widget-weather">
        {weatherState === "ready" && weather?.weather?.icon ? (
          <Image
            src={`https://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`}
            alt={weather.weather.description || weather.weather.main}
            width={38}
            height={38}
            unoptimized
          />
        ) : (
          <CloudSun size={19} aria-hidden="true" />
        )}
        <div>
          {weatherState === "ready" &&
          typeof weather?.main?.temp === "number" ? (
            <span className="context-widget-temperature">
              {Math.round(weather.main.temp)}°C
            </span>
          ) : (
            <span className="context-widget-temperature">Mumbai</span>
          )}
          <span className="context-widget-condition">
            {weatherState === "loading" && "Loading weather"}
            {weatherState === "error" && "Weather unavailable"}
            {weatherState === "ready" &&
              (weather?.weather?.description ||
                weather?.weather?.main ||
                "Current weather")}
          </span>
        </div>
      </div>

      <p className="context-widget-message">
        <MapPin size={12} aria-hidden="true" />
        <span>{message}</span>
      </p>
    </aside>
  );
}
