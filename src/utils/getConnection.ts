import { Connection } from "@solana/web3.js";
import { Maybe } from "src/types/UtilityTypes";

let connection: Maybe<Connection> = null;

export default function getConnection(): Connection {
  if (connection != null) {
    return connection;
  }

  connection = new Connection(
    "https://patient-proud-dew.solana-mainnet.quiknode.pro/0c5b5dfc389f144e912274604daa0a401b2bf367/"
  );
  return connection;
}
