import * as React from "react";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className="bg-white rounded-lg shadow-md p-6 space-y-4 mb-8"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <div>{children}</div>
    </section>
  );
}
