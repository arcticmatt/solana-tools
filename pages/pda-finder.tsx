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
import HeadContainer from "src/components/containers/HeadContainer";

function PdaFinder() {
  const [programId, setProgramId] = useState<string>("");
  const [seeds, setSeeds] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<Maybe<string>>(null);
  const [pda, setPda] = useState<Maybe<string>>(null);
  const [bump, setBump] = useState<Maybe<number>>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ContainerOuter>
      <Header />
      <ResponsiveContainer>
        <div className={styles.containerInner}>
          <HeaderAndDescriptions
            header={<>Solana PDA Finder 🤔</>}
            description="A tool for finding Solana PDAs (program derived addresses)."
            help={[
              <>
                All seeds (e.g. addresses and string literals) should be entered
                as strings. They will be automatically converted to buffers. One
                more thing—don&apos;t enter the bump! It will be calculated
                automatically.
              </>,
              <>
                To test it out, try using
                <ul
                  style={{
                    marginTop: 2,
                    textAlign: "left",
                    wordBreak: "break-all",
                  }}
                >
                  <li>
                    Program ID = 2zHwAYnZeN8gip3j6HkU5nvKpraVaFJSXfGLZb4FFWE6
                  </li>
                  <li>Seeds = base_account</li>
                </ul>
              </>,
            ]}
          />
          <div className={styles.inputsAndButton}>
            <div className={styles.inputs}>
              <input
                className={joinClasses(GlobalClass.Input, FontClass.Body1)}
                onChange={(e) => {
                  setProgramId(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Program ID"
                type="text"
                value={programId}
              />
              <input
                className={joinClasses(GlobalClass.Input, FontClass.Body1)}
                onChange={(e) => {
                  setSeeds(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="seed1,seed2,..."
                type="text"
                value={seeds}
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
                  const pubkey = new PublicKey(programId);
                  try {
                    const seedBuffers = seeds
                      .split(",")
                      .map((seed) => seed.trim())
                      .map((seed) => {
                        try {
                          return new PublicKey(seed).toBuffer();
                        } catch {
                          return Buffer.from(seed);
                        }
                      });
                    const [pdaAddress, bumpInner] =
                      await PublicKey.findProgramAddress(seedBuffers, pubkey);
                    setPda(pdaAddress.toString());
                    setBump(bumpInner);
                  } catch (e) {
                    setErrorMessage("Unexpected error");
                  }
                } catch {
                  setErrorMessage("Program ID is not a valid address");
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
  PdaFinder,
  "A tool for finding/deriving Solana PDAs (program derived addresses)"
);
