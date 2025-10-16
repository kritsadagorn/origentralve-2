"use client";

import React from "react";
import ProgramCard, { type ProgramItem } from "./ProgramCard";

export default function ProgramsGrid({ items }: { items: ProgramItem[] }) {
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    (e.currentTarget as HTMLElement).style.setProperty("--x", `${x}%`);
  }
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2" onMouseMove={onMove}>
      {items.map((it, idx) => (
        <ProgramCard key={it.key} item={it} index={idx} />
      ))}
    </div>
  );
}
