import { ThemeSwitch } from "@/components/theme-switch";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <div className="flex justify-end">
        <ThemeSwitch className="absolute top-0 right-0 mt-4 mr-4" />
      </div>
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3"></footer>
    </div>
  );
}
