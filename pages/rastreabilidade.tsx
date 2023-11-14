/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable turbo/no-undeclared-env-vars */

import { Fragment, useEffect, useState } from "react";
import { useContract } from "@thirdweb-dev/react";
import { Header } from "lib/components/header";
import { Menu } from "lib/components/menu/menu";
import { Layout } from "lib/ui/layout";

export default function Page(): JSX.Element {
  const contractAddress = process.env.FANTON_SMART_CONTRACT_ADDRESS;
  const [events, setEvents] = useState<any[]>([]);
  const { contract } = useContract(contractAddress);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      if (!contract) return;
      setEvents(await contract.events.getAllEvents());
    })()
  }, [contract]);

  return (
    <Layout>
      <Header />
      <Menu />
      <section className="grid grid-cols-fill500 mt-8 gap-4 m-auto max-w-7xl pt-6 pb-8">
        {events.map((event, index: number) => {
          if (event.eventName === 'CertificateIssued') {
            return (
              <section className="text-white space-y-2 border-[#27272A] border-2 p-6 rounded-md w-full my-3 max-w-xl" key={index}>
                <p className="text-center pb-4 uppercase font-bold">{event.eventName}</p>
                <p>Instituição: &nbsp;
                  <a className="text-blue-400" href={`https://testnet.ftmscan.com/address/${event.data.institution}`} rel="noreferrer noreferrer" target="_blank">
                    {event.data.institution}
                  </a>
                </p>
                <p>Contrato: &nbsp;
                  <a className="text-blue-400" href={`https://testnet.ftmscan.com/address/${event.transaction.address}`} rel="noreferrer noreferrer" target="_blank">
                    {event.transaction.address}
                  </a>
                </p>
                <p>Número do Bloco: &nbsp;
                  <a className="text-blue-400" href={`https://testnet.ftmscan.com/block/${event.transaction.blockNumber}`} rel="noreferrer noreferrer" target="_blank">
                    {event.transaction.blockNumber}
                  </a>
                </p>
              </section>
            )
          }
          return <Fragment key={index} />
        })}
      </section>
    </Layout>
  );
}
