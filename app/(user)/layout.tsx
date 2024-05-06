import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css"
import NavbarComponent from "@/components/navbar/NavbarComponent";
import SessionWrapper from "../SessoinProvider";
import StoreProvider from "../storeProvider";
import { FooterComponent } from "@/components/footer/page";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: "https://i.pinimg.com/564x/d5/7b/75/d57b75ed30371746f70364dd53bc4511.jpg"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={`${inter.className} flex flex-col min-h-screen`}>
            <StoreProvider>
              <header>
              <NavbarComponent/>
              </header>

              {/* child for wrap the whole page */}
              <main className="flex-grow">
                {children}
              </main>

              <FooterComponent/>
            </StoreProvider>
        </body>
      </SessionWrapper>
    </html>
  );
}
