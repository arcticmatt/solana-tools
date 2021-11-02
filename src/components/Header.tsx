import styles from "@/css/Header.module.css";
import Link from "next/link";
import Body1 from "src/components/text/Body1";

function Item({ href, name }: { href: string; name: string }) {
  return (
    <div className={styles.item}>
      <Link href={href}>
        <div>
          <Body1>{name}</Body1>
        </div>
      </Link>
    </div>
  );
}

export default function Header(): JSX.Element {
  return (
    <div className={styles.header}>
      <Item href="/pda-finder" name="PDA Finder" />
      <Item href="/pda-finder" name="Foo" />
      <Item href="/pda-finder" name="Bar" />
    </div>
  );
}