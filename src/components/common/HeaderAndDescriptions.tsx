import styles from "@/css/common/HeaderAndDescriptions.module.css";
import Body1 from "src/components/text/Body1";
import Body2 from "src/components/text/Body2";
import Header1 from "src/components/text/Header1";
import ColorClass from "src/types/enums/ColorClass";

type Props = {
  description: any;
  header: any;
  help: Array<any>;
};

export default function HeaderAndDescriptions({
  description,
  header,
  help,
}: Props): JSX.Element {
  return (
    <>
      <Header1 colorClass={ColorClass.Primary} textAlign="center">
        {header}
      </Header1>
      <Body1
        className={styles.description}
        colorClass={ColorClass.Primary}
        textAlign="center"
      >
        {description}
      </Body1>
      {help.map((helpItem, index) => (
        <Body2
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={styles.help}
          colorClass={ColorClass.Secondary}
          textAlign="center"
        >
          {helpItem}
        </Body2>
      ))}
    </>
  );
}
