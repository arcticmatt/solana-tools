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
import HeadContainer from "src/components/containers/HeadContainer";
import useSolanaContext from "src/hooks/useSolanaContext";

function MetaplexEditionFinder() {
  const [mintAddress, setMintAddress] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<Maybe<string>>(null);
  const [pda, setPda] = useState<Maybe<string>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editionData, setEditionData] =
    useState<
      Maybe<programs.metadata.MasterEdition | programs.metadata.Edition>
    >(null);
  const { connection } = useSolanaContext();

  return (
    <ContainerOuter>
      <Header />
      <ResponsiveContainer>
        <div className={styles.containerInner}>
          <HeaderAndDescriptions
            header={<>Metaplex Edition Finder 📕</>}
            description="A tool for finding Metaplex edition PDAs."
            help={[
              "Try with 9wpkPsddRdfhUWfrt1rErZCsWSeHHRcN4LRyK7ZgHCkN (for master edition) or B4tk6Um3rruhcfJySzfFaEGQ68jmXzJdYVAYe336m5L7 (for edition)",
              <>
                See{" "}
                <a href="https://github.com/metaplex-foundation/metaplex-program-library/blob/master/token-metadata/js/src/accounts/MasterEdition.ts#L95-L102">
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
                setErrorMessage(null);
                try {
                  const pubkey = new PublicKey(mintAddress);
                  try {
                    const pdaAddress =
                      await programs.metadata.MasterEdition.getPDA(pubkey);

                    try {
                      const masterEditionData =
                        await programs.metadata.MasterEdition.load(
                          connection,
                          pdaAddress
                        );
                      setPda(pdaAddress.toString());
                      setEditionData(masterEditionData);
                    } catch (e) {
                      const editionDataInner =
                        await programs.metadata.Edition.load(
                          connection,
                          pdaAddress
                        );
                      setPda(pdaAddress.toString());
                      setEditionData(editionDataInner);
                    }
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
          {pda != null && editionData != null && errorMessage == null && (
            <div className={styles.results}>
              <Results
                data={JSON.stringify(editionData.data, null, 2)}
                pda={pda}
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
  MetaplexEditionFinder,
  "A tool for finding and displaying Solana Metaplex editions"
);
