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
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import Header from "src/components/Header";
import GlobalClass from "src/types/enums/GlobalClass";
import { programs } from "@metaplex/js";
import ContainerOuter from "src/components/containers/ContainerOuter";
import HeaderAndDescriptions from "src/components/common/HeaderAndDescriptions";
import getConnection from "src/utils/getConnection";

export default function MetaplexMetadataDisplay() {
  const [metadataAddress, setMetdataAddress] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<Maybe<string>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] =
    useState<Maybe<programs.metadata.Metadata>>(null);

  return (
    <ContainerOuter>
      <Header />
      <ResponsiveContainer>
        <div className={styles.containerInner}>
          <HeaderAndDescriptions
            header={<>Metaplex Metadata Display 🔍</>}
            description="A tool for displaying Metaplex token metadata."
            help={["Try with 8XRPNdKKVmigvHPopWGF8atd8Cz8UKRkFUaYpMLsQRgH"]}
          />
          <div className={styles.inputsAndButton}>
            <div className={styles.inputs}>
              <input
                className={joinClasses(GlobalClass.Input, FontClass.Body1)}
                onChange={(e) => {
                  setMetdataAddress(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Metadata PDA"
                type="text"
                value={metadataAddress}
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
                  const pubkey = new PublicKey(metadataAddress);
                  try {
                    const metadataInner = await programs.metadata.Metadata.load(
                      getConnection(),
                      pubkey
                    );
                    setMetadata(metadataInner);
                  } catch (e) {
                    setErrorMessage("Unexpected error");
                  }
                } catch {
                  setErrorMessage("Metdata PDA is not a valid address");
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
          {metadata != null && errorMessage == null && (
            <div className={styles.results}>
              <pre>{JSON.stringify(metadata.data, null, 4)}</pre>
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
