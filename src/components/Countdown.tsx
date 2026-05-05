import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string; // ISO date string
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const update = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      });
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-3">
      <span className="font-body text-xs uppercase tracking-wider" style={{ color: "#D4A373" }}>
        Quedan
      </span>
      {[
        { value: timeLeft.days, label: "d" },
        { value: timeLeft.hours, label: "h" },
        { value: timeLeft.minutes, label: "m" },
      ].map((unit, i) => (
        <div key={i} className="flex items-center gap-1">
          <span
            className="font-display text-lg px-2 py-1 rounded"
            style={{
              background: "rgba(199, 184, 154, 0.15)",
              color: "#D4A373",
              fontWeight: 500,
              minWidth: "32px",
              textAlign: "center",
            }}
          >
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="font-body text-xs" style={{ color: "#6B6B6B" }}>
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
