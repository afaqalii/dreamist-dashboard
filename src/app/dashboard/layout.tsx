import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ProtectedRoute from "@/lib/ProtectedRoute";
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Byte Basha Dashboard",
  description: "Manage all your website content from one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <body className={inter.className}>
              <ProtectedRoute>
                <section className="flex w-full h-screen">
                  <Sidebar />
                  <main className="flex flex-col w-full overflow-auto">
                    <Navbar />
                    <div className="container p-5">
                      {children}
                    </div>
                  </main>
                </section>
              </ProtectedRoute>
            </body>
    </html>
  );
}
