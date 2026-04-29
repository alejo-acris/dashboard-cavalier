import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Dashboard | Agencia",
  description: "Dashboard de Consumo de Inteligencia Artificial para clientes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-[#020817] text-slate-100 min-h-screen antialiased selection:bg-blue-500/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
