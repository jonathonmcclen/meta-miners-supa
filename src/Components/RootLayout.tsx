import { ReactNode, useEffect, useState } from "react";
import MainNavigation from "./MainNavigation";
import Header1 from "./header1";
import Header2 from "./header2";
import { useAuth } from "../hooks/Auth";
import Footer from "./Footer";
import AnimatedBg from "./AnimatedBg";

function RootLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { signOut } = useAuth();

  return (
    <>
      {/* <MainNavigation /> */}
      {!user ? <Header1 /> : <Header2 />}
      <AnimatedBg />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default RootLayout;
