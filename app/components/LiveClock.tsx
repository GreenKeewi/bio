"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Toronto",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

export default function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()).toLowerCase());
    const frame = requestAnimationFrame(update);
    const interval = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

  return (
    <span className="tabular-nums" aria-label={time ? `Time in Toronto: ${time}` : "Toronto local time"}>
      {time ?? "Local time"}
    </span>
  );
}
