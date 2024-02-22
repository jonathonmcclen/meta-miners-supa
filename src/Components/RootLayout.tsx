import { ReactNode, useEffect, useState } from "react";
import MainNavigation from "./MainNavigation";
import Header1 from "./header1";
import Header2 from "./header2";
import { useAuth } from "../hooks/Auth";

function RootLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { signOut } = useAuth();

  return (
    <>
      {/* <MainNavigation /> */}
      {!user ? <Header1 /> : <Header2 />}

      <main>{children}</main>
    </>
  );
}

export default RootLayout;
