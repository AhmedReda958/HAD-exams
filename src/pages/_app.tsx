import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/components/MainLayout";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <MainLayout>
        <Toaster />
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
}
