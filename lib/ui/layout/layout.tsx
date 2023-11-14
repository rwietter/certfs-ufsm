import type { PropsWithChildren } from "react";
import React from "react";

type LayoutProps = PropsWithChildren;

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <main className="bg-zinc-950 h-screen w-full items-center flex flex-col relative">
      <div className="w-full relative">
        {props.children}
      </div>
    </main>
  );
};

export { Layout };
