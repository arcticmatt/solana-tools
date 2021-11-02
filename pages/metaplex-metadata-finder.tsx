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
import { programs } from "@metaplex/js";
import ContainerOuter from "src/components/containers/ContainerOuter";
import HeaderAndDescriptions from "src/components/common/HeaderAndDescriptions";

export default function MetaplexMetadataFinder() {
  const [mintAddress, setMintAddress] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<Maybe<string>>(null);
  const [pda, setPda] = useState<Maybe<string>>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ContainerOuter>
      <Header />
      <ResponsiveContainer>
        <div className={styles.containerInner}>
          <HeaderAndDescriptions
            header={<>Metaplex Metadata Finder 🪙</>}
            description="A tool for finding Metaplex token metadata PDAs."
            help={[
              "Try with 74G1aB9udmzQ8DCL9oSHoFDXWsrSewqayADNtfU8YwUo",
              <>
                See{" "}
                <a href="https://github.com/metaplex/js/blob/main/src/programs/metadata/accounts/Metadata.ts#L120-L126">
                  here
                </a>{" "}
                for how this gets calculated.
              </>,
            ]}
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
                  const pubkey = new PublicKey(mintAddress);
                  try {
                    const pdaAddress = await programs.metadata.Metadata.getPDA(
                      pubkey
                    );
                    setPda(pdaAddress.toString());
                  } catch (e) {
                    setErrorMessage("Unexpected error");
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
          {pda != null && errorMessage == null && (
            <div className={styles.results}>
              <Results pda={pda} />
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
