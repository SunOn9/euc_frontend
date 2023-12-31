import "@/styles/globals.css";
import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container m-auto max-w-12xl px-4 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3"></footer>
    </div>
  );
}
