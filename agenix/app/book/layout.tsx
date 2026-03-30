import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call",
  alternates: { canonical: "https://dizilo.com/book" },
  description: "Book a free 30-minute discovery call with Dizilo. Pick a date and time — we'll send a Google Meet link instantly.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
