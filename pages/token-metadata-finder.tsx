import ResponsiveContainer from "src/components/ResponsiveContainer";
import styles from "@/css/pages/PdaFinder.module.css";
import ColorClass from "src/types/enums/ColorClass";
import Body1 from "src/components/text/Body1";
import { useState } from "react";
import joinClasses from "src/utils/joinClasses";
import FontClass from "src/types/enums/FontClass";
import Footer from "src/components/Footer";
import { PublicKey } from "@solana/web3.js";
import { Maybe } from "src/types/UtilityTypes";
import Results from "src/components/Results";
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import Header from "src/components/Header";
import GlobalClass from "src/types/enums/GlobalClass";
import ContainerOuter from "src/components/containers/ContainerOuter";
import HeaderAndDescriptions from "src/components/common/HeaderAndDescriptions";
import useTokenMap from "src/hooks/useTokenMap";
import { TokenInfo } from "@solana/spl-token-registry";
import HeadContainer from "src/components/containers/HeadContainer";

function TokenMetadataFinder() {
  const [mintAddress, setMintAddress] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<Maybe<string>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { devnetTokenMap, mainnetTokenMap } = useTokenMap();
  const [devnetTokenInfo, setDevnetTokenInfo] =
    useState<Maybe<TokenInfo>>(null);
  const [mainnetTokenInfo, setMainnetTokenInfo] =
    useState<Maybe<TokenInfo>>(null);

  return (
    <ContainerOuter>
      <Header />
      <ResponsiveContainer>
        <div className={styles.containerInner}>
          <HeaderAndDescriptions
            header={<>Token Metadata Finder 🔍</>}
            description={
              <>
                A tool for finding and displaying token metadata using{" "}
                <a href="https://github.com/solana-labs/token-list">
                  spl-token-registry
                </a>
                .
              </>
            }
            help={["Try with EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp"]}
          />
          <div className={styles.inputsAndButton}>
            <div className={styles.inputs}>
              <input
                className={joinClasses(GlobalClass.Input, FontClass.Body1)}
                onChange={(e) => {
                  setMintAddress(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Mint address"
                type="text"
                value={mintAddress}
              />
            </div>
            <button
              className={joinClasses(
                styles.button,
                FontClass.Body1,
                GlobalClass.ButtonPlain
              )}
              onClick={async () => {
                setIsLoading(true);
                try {
                  // eslint-disable-next-line no-new
                  new PublicKey(mintAddress);

                  if (
                    !devnetTokenMap.has(mintAddress) &&
                    !mainnetTokenMap.has(mintAddress)
                  ) {
                    setErrorMessage("Token metadata not found");
                  } else {
                    setDevnetTokenInfo(devnetTokenMap.get(mintAddress) ?? null);
                    setMainnetTokenInfo(
                      mainnetTokenMap.get(mintAddress) ?? null
                    );
                  }
                } catch {
                  setErrorMessage("Mint address is not a valid address");
                }

                setIsLoading(false);
              }}
              type="button"
            >
              Search
            </button>
          </div>
          {errorMessage != null && (
            <Body1
              className={styles.errorMessage}
              colorClass={ColorClass.Error}
            >
              {errorMessage}
            </Body1>
          )}
          {devnetTokenInfo != null && errorMessage == null && (
            <div className={styles.results}>
              <Results
                data={JSON.stringify(devnetTokenInfo, null, 2)}
                network="devnet"
              />
            </div>
          )}
          {mainnetTokenInfo != null && errorMessage == null && (
            <div className={styles.results}>
              <Results
                data={JSON.stringify(mainnetTokenInfo, null, 2)}
                network="mainnet"
              />
            </div>
          )}
          {isLoading && (
            <div className={styles.loading}>
              <LoadingSpinner height={24} width={24} />
            </div>
          )}
        </div>
      </ResponsiveContainer>
      <Footer />
    </ContainerOuter>
  );
}

export default HeadContainer(
  TokenMetadataFinder,
  "A tool for finding and displaying token metadata (e.g. token symbol and name)"
);
