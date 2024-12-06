import { ReactNode } from "react";

import Sidebar from "@shared/_components/sidebar";

export default function FeaturesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <section className="flex-1">{children}</section>
    </div>
  );
}
