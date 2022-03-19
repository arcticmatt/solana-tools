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
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import HeadContainer from "src/components/containers/HeadContainer";

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

async function findAssociatedTokenAddress(
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [
      walletAddress.toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      tokenMintAddress.toBuffer(),
    ],
    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  );
}

function AtaFinder() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [mintAddress, setMintAddress] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<Maybe<string>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pda, setPda] = useState<Maybe<string>>(null);
  const [bump, setBump] = useState<Maybe<number>>(null);

  return (
    <ContainerOuter>
      <Header />
      <ResponsiveContainer>
        <div className={styles.containerInner}>
          <HeaderAndDescriptions
            header={<>Associated Token Account Finder 🔍</>}
            description={
              <>
                A tool for finding{" "}
                <a href="https://spl.solana.com/associated-token-account">
                  ATAs
                </a>
              </>
            }
            help={[
              "Try with wallet address = CnXicErFtkKtLjR9NDECEaNA9b5jsfpC3DuD1cA1aivQ and mint address = 74G1aB9udmzQ8DCL9oSHoFDXWsrSewqayADNtfU8YwUo",
            ]}
          />
          <div className={styles.inputsAndButton}>
            <div className={styles.inputs}>
              <input
                className={joinClasses(GlobalClass.Input, FontClass.Body1)}
                onChange={(e) => {
                  setWalletAddress(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Wallet address"
                type="text"
                value={walletAddress}
              />
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
                  // eslint-disable-next-line no-new
                  new PublicKey(walletAddress);
                  // eslint-disable-next-line no-new
                  new PublicKey(mintAddress);

                  try {
                    const [pdaAddress, bumpInner] =
                      await findAssociatedTokenAddress(
                        new PublicKey(walletAddress),
                        new PublicKey(mintAddress)
                      );
                    setPda(pdaAddress.toString());
                    setBump(bumpInner);
                  } catch {
                    setErrorMessage("Unexpected error");
                  }
                } catch {
                  setErrorMessage(
                    "Either mint address or wallet address is not a valid address"
                  );
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
          {bump != null && pda != null && errorMessage == null && (
            <div className={styles.results}>
              <Results bump={bump} pda={pda} />
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
  AtaFinder,
  "A tool for finding Solana Associated Token Account addresses"
);
