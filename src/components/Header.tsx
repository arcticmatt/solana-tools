/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-restricted-syntax */
import styles from "@/css/Header.module.css";
import Link from "next/link";
import { useLayoutEffect } from "react";
import Body1 from "src/components/text/Body1";

function Item({ href, name }: { href: string; name: string }) {
  return (
    <div className={styles.item}>
      <Link href={href}>
        <div>
          <Body1 textAlign="center">{name}</Body1>
        </div>
      </Link>
    </div>
  );
}

export default function Header(): JSX.Element {
  useLayoutEffect(() => {
    function highlightFirst() {
      const flexContainer = document.getElementById("header-flex");
      const flexChildren = flexContainer?.children;
      if (flexChildren == null) {
        return;
      }
      // @ts-ignore
      const leftPosition = flexChildren[0].offsetLeft;
      for (const flexChild of flexChildren) {
        // @ts-ignore
        if (flexChild.offsetLeft <= leftPosition) {
          flexChild.classList.add("firstColumn");
        } else {
          flexChild.classList.remove("firstColumn");
        }
      }
    }
    highlightFirst();
    window.addEventListener("resize", highlightFirst);
  }, []);

  return (
    <div className={styles.header} id="header-flex">
      <Item href="/pda-finder" name="PDA Finder" />
      <Item href="/metaplex-metadata-finder" name="Metaplex Metadata Finder" />
      <Item href="/metaplex-edition-finder" name="Metaplex Edition Finder" />
      <Item href="/token-metadata-finder" name="Token Metadata Finder" />
      <Item href="/ata-finder" name="ATA Finder" />
      <Item href="/resources" name="Resources" />
    </div>
  );
}
