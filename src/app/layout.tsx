import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "Fitnix | أول منصة عربية للذكاء الاصطناعي في اللياقة البدنية",
  description: "أول منصة عربية متكاملة تستخدم الذكاء الاصطناعي لإنشاء خطط تمارين وتغذية مخصصة. درب نفسك بذكاء مع Fitnix.",
  keywords: ["fitnix", "لياقة بدنية", "تمارين", "ذكاء اصطناعي", "تغذية", "bodybuilding", "fitness"],
  openGraph: {
    title: "Fitnix | الذكاء الاصطناعي للياقتك",
    description: "أول منصة عربية للذكاء الاصطناعي في اللياقة البدنية",
    type: "website",
    locale: "ar_SA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
