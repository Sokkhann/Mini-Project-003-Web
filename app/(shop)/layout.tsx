import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import "@/app/globals.css"
import NavbarComponent from "@/components/navbar/NavbarComponent";
import { Providers } from "../provider";
import StoreProvider from "../storeProvider";
import SessionWrapper from "../SessoinProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionWrapper>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
        )}
      >
        <StoreProvider>
        <Providers>
          <div className="relative flex flex-col h-screen">
            <NavbarComponent />
            <main className="container mx-auto max-w-7xl pt-4 flex-grow">
              {children}
            </main>
          </div>
        </Providers>
        </StoreProvider>
      </body>
      </SessionWrapper>
    </html>
  );
}