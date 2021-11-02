import styles from "@/css/Results.module.css";
import { AccountInfo, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import Body1 from "src/components/text/Body1";
import Body1SemiBold from "src/components/text/Body1SemiBold";
import { MaybeUndef } from "src/types/UtilityTypes";
import getConnection from "src/utils/getConnection";

function Row({ name, value }: { name: string; value: any }): JSX.Element {
  return (
    <>
      <Body1SemiBold className={styles.name}>{name}</Body1SemiBold>
      <Body1 className={styles.value}>{value}</Body1>
    </>
  );
}

type Props = {
  bump: number;
  pda: string;
};

export default function Results({ bump, pda }: Props): JSX.Element {
  const [accountInfo, setAccountInfo] =
    useState<MaybeUndef<AccountInfo<Buffer>>>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function run() {
      setIsLoading(true);
      const connection = getConnection();
      const accountInfoInner = await connection.getAccountInfo(
        new PublicKey(pda)
      );
      setAccountInfo(accountInfoInner);
      setIsLoading(false);
    }

    run();
  }, [pda]);

  return (
    <div className={styles.container}>
      <Row name="PDA" value={pda} />
      <Row name="Bump" value={bump} />
      <Row
        name="Account Exists?"
        value={
          isLoading ? (
            <LoadingSpinner height={22} width={22} />
          ) : accountInfo == null ? (
            "Does not exist"
          ) : (
            "Exists"
          )
        }
      />
      <Row
        name="View on devnet"
        value={
          <a href={`https://explorer.solana.com/address/${pda}?cluster=devnet`}>
            Go to explorer (devnet)
          </a>
        }
      />
      <Row
        name="View on mainnet"
        value={
          <a
            href={`https://explorer.solana.com/address/${pda}?cluster=mainnet`}
          >
            Go to explorer (mainnet)
          </a>
        }
      />
    </div>
  );
}
