import React from "react";
import { ConnectWallet, /* useAddress */ } from "@thirdweb-dev/react";

const Header: React.FC = (): JSX.Element => {
  // const address = useAddress();
  return (
    <header className="flex items-center justify-center h-24 w-full top-0 backdrop-blur-md">
      <div className="flex items-center justify-between w-full max-w-7xl py-2 px-6">
        <section className="flex">
          <h1 className="text-3xl font-bold text-white items-start">Cert.fs</h1>
        </section>
        <section className="flex">
          <ConnectWallet
            btnTitle="Conectar Carteira"
            dropdownPosition={{
              side: "bottom",
              align: "center",
            }}
          />
        </section>
      </div>
    </header>
  );
};

export { Header };
