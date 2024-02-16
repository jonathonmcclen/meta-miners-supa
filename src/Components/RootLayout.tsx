import { ReactNode, useEffect, useState } from "react";
import MainNavigation from "./MainNavigation";
import Header1 from "./header1";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainNavigation />
      <Header1 />
      <main>{children}</main>
    </>
  );
}

export default RootLayout;
