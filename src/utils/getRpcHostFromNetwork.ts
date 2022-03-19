import Network from "src/types/enums/Network";

export default function getRpcHostFromNetwork(network: Network): string {
  switch (network) {
    case Network.Devnet:
      return "https://delicate-withered-firefly.solana-devnet.quiknode.pro/58ca10c397f657023a24a2b834bd1e628b4c23f9/";
    case Network.Mainnet:
      return "https://solana-api.syndica.io/access-token/hFRDjmwQwiXvP4etqbjotkM1UXw20qlTny3Xb76k6uj4A4OQ80th19PI2yCQ2Qu7/rpc";
    default:
      throw new Error("should not reach");
  }
}
