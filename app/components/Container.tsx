import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-4">{children}</div>;
}
