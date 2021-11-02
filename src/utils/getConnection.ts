import { Connection } from "@solana/web3.js";
import { Maybe } from "src/types/UtilityTypes";

let connection: Maybe<Connection> = null;

export default function getConnection(): Connection {
  if (connection != null) {
    return connection;
  }

  connection = new Connection("https://api.devnet.solana.com/");
  return connection;
}
