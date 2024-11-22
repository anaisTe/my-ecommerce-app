import '@/app/ui/globals.css';
import { Footer } from "./components/Footer";
import { NavBar } from './components/NavBar';
import { Suspense } from 'react';


// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full">
        <NavBar />
        <Suspense fallback={<div>Cargando...</div>}>
          <main>{children}</main>
        </Suspense>
        <div className="mt-auto w-full">
          <Footer />
        </div>
      </body>
    </html>
  );
}
