import styles from "@/css/Footer.module.css";
import TwitterIcon from "src/components/icons/TwitterIcon";
import Body2 from "src/components/text/Body2";
import ColorClass from "src/types/enums/ColorClass";
import ColorValue from "src/types/enums/ColorValue";

export default function Footer(): JSX.Element {
  return (
    <div className={styles.footer}>
      <Body2 textAlign="center">
        Made by{" "}
        <span className={styles.madeBy}>
          <a href="https://twitter.com/pencilflip">@pencilflip</a>{" "}
          <TwitterIcon colorValue={ColorValue.TwitterBlue} />
        </span>
      </Body2>
      <Body2
        className={styles.madeBy}
        colorClass={ColorClass.Secondary}
        textAlign="center"
      >
        <a
          className={styles.grayLink}
          href="https://github.com/arcticmatt/solana-tools"
        >
          View the source code
        </a>
        <img className={styles.github} src="/github.svg" alt="Github" />
      </Body2>
      <Body2 colorClass={ColorClass.Secondary} textAlign="center">
        <a className={styles.grayLink} href="https://twitter.com/pencilflip">
          Hmu
        </a>{" "}
        if you have questions or feedback!
      </Body2>
    </div>
  );
}
