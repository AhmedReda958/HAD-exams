import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DarkModeToggle from "./DarkModeToggle";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>HAD Exams</title>
      </Head>
      <header className=" bg-background shadow">
        <nav className="mx-auto  max-w-7xl p-6 lg:px-8 py-4 flex items-center justify-between ">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl font-sans"
          >
            <Image src="/logo.svg" height={35} width={35} alt="had logo" />
            HAD Exams
          </Link>
          <DarkModeToggle />
        </nav>
      </header>
      <main className="pt-4">{children}</main>
    </>
  );
};

export default MainLayout;
