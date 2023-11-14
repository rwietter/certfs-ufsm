/* eslint-disable turbo/no-undeclared-env-vars */
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { FantomTestnet } from "@thirdweb-dev/chains";
import { Toaster } from "lib/ui/toaster";
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps): JSX.Element {
  const THIRDWEB_CLIENT_ID = String(process.env.THIRDWEB_CLIENT_ID);
  return (
    <ThirdwebProvider activeChain={FantomTestnet} clientId={THIRDWEB_CLIENT_ID}>
      <Component {...pageProps} />
       <Toaster />
    </ThirdwebProvider>
  );
}

export default App;