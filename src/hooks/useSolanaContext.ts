import { useContext } from "react";
import { SolanaContext } from "src/context/SolanaContext";

export default function useSolanaContext() {
  return useContext(SolanaContext);
}
