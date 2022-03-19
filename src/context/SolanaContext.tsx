/* eslint-disable react/jsx-no-constructed-context-values */
import { Connection } from "@solana/web3.js";
import { Context, createContext, useEffect, useState } from "react";
import Network from "src/types/enums/Network";
import emptyFunction from "src/utils/emptyFunction";
import getRpcHostFromNetwork from "src/utils/getRpcHostFromNetwork";

const DEFAULT_CONNECTION = new Connection(
  getRpcHostFromNetwork(Network.Mainnet)
);

export type SolanaContextData = {
  connection: Connection;
  network: Network;

  setNetwork: (val: Network) => void;
};

export const SolanaContext: Context<SolanaContextData> =
  createContext<SolanaContextData>({
    connection: DEFAULT_CONNECTION,
    network: Network.Mainnet,
    setNetwork: emptyFunction,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export function SolanaContextProvider(props: ProviderProps): JSX.Element {
  const [network, setNetwork] = useState<Network>(Network.Mainnet);
  const [connection, setConnection] = useState<Connection>(DEFAULT_CONNECTION);

  useEffect(() => {
    setConnection(new Connection(getRpcHostFromNetwork(network)));
  }, [network]);

  return (
    <SolanaContext.Provider
      value={{
        connection,
        network,
        setNetwork,
      }}
    >
      {props.children}
    </SolanaContext.Provider>
  );
}
