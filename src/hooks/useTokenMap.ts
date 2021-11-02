import { useEffect, useState } from "react";
import { TokenInfo, TokenListProvider, ENV } from "@solana/spl-token-registry";

export default function useTokenMap() {
  const [devnetTokenMap, setDevnetTokenMap] = useState<Map<string, TokenInfo>>(
    new Map()
  );
  const [mainnetTokenMap, setMainnetTokenMap] = useState<
    Map<string, TokenInfo>
  >(new Map());

  useEffect(() => {
    new TokenListProvider().resolve().then((tokens) => {
      const devnetTokenList = tokens.filterByChainId(ENV.Devnet).getList();

      setDevnetTokenMap(
        devnetTokenList.reduce((map, item) => {
          map.set(item.address, item);
          return map;
        }, new Map())
      );

      const mainnetTokenList = tokens
        .filterByChainId(ENV.MainnetBeta)
        .getList();

      setMainnetTokenMap(
        mainnetTokenList.reduce((map, item) => {
          map.set(item.address, item);
          return map;
        }, new Map())
      );
    });
  }, [setDevnetTokenMap, setMainnetTokenMap]);

  return { devnetTokenMap, mainnetTokenMap };
}
