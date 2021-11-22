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
import getConnection from "src/utils/getConnection";
import HeadContainer from "src/components/containers/HeadContainer";

function MetaplexMetadataFinder() {
  const [mintAddress, setMintAddress] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<Maybe<string>>(null);
  const [pda, setPda] = useState<Maybe<string>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [masterEditionData, setMasterEditionData] =
    useState<Maybe<programs.metadata.MasterEdition>>(null);

  return (
    <ContainerOuter>
      <Header />
      <ResponsiveContainer>
        <div className={styles.containerInner}>
          <HeaderAndDescriptions
            header={<>Metaplex Master Edition Finder 📕</>}
            description="A tool for finding Metaplex master edition PDAs."
            help={[
              "Try with 74G1aB9udmzQ8DCL9oSHoFDXWsrSewqayADNtfU8YwUo",
              <>
                See{" "}
                <a href="https://github.com/metaplex/js/blob/main/src/programs/metadata/accounts/MasterEdition.ts#L90-L97">
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
                    const pdaAddress =
                      await programs.metadata.MasterEdition.getPDA(pubkey);
                    const masterEditionDataInner =
                      await programs.metadata.MasterEdition.load(
                        getConnection(),
                        pdaAddress
                      );
                    setPda(pdaAddress.toString());
                    setMasterEditionData(masterEditionDataInner);
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
          {pda != null && masterEditionData != null && errorMessage == null && (
            <div className={styles.results}>
              <Results
                data={JSON.stringify(masterEditionData.data, null, 2)}
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
  MetaplexMetadataFinder,
  "A tool for finding and displaying Solana Metaplex master editions"
);
