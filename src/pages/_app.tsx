import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/components/MainLayout";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Toaster />
      <Component {...pageProps} />
    </MainLayout>
  );
}
