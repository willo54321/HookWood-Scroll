import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "Hookwood Housing | 446 Homes Near Gatwick",
  description:
    "Support plans for 446 new homes including 200 affordable homes at Hookwood, near Gatwick. Register your support for affordable housing in Surrey.",
  openGraph: {
    title: "Priced out of Surrey? | Hookwood Housing",
    description:
      "446 homes, including 200 affordable homes are coming to Hookwood, near Gatwick. Support plans that could help you get on the housing ladder.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vxm987u69b");
          `}
        </Script>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
