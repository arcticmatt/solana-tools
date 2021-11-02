import ColorValue from "src/types/enums/ColorValue";
import joinClasses from "src/utils/joinClasses";
import styles from "@/css/loading/LoadingSpinner.module.css";

const COLOR_MAP = {
  [ColorValue.Navy]: styles.skCircleNavy,
  [ColorValue.Primary]: styles.skCirclePrimary,
  [ColorValue.Secondary]: styles.skCircleSecondary,
  [ColorValue.White]: styles.skCircleWhite,
};

type Props = {
  className?: string;
  colorValue?: keyof typeof COLOR_MAP;
  height?: number;
  width?: number;
};

export default function LoadingSpinner({
  className,
  colorValue = ColorValue.Primary,
  height = 40,
  width = 40,
}: Props): JSX.Element {
  const colorClassName = COLOR_MAP[colorValue];

  return (
    <div
      className={joinClasses(styles.skCircle, colorClassName, className)}
      style={{ height, width }}
    >
      <div className={joinClasses(styles.skCircle1, styles.skChild)} />
      <div className={joinClasses(styles.skCircle2, styles.skChild)} />
      <div className={joinClasses(styles.skCircle3, styles.skChild)} />
      <div className={joinClasses(styles.skCircle4, styles.skChild)} />
      <div className={joinClasses(styles.skCircle5, styles.skChild)} />
      <div className={joinClasses(styles.skCircle6, styles.skChild)} />
      <div className={joinClasses(styles.skCircle7, styles.skChild)} />
      <div className={joinClasses(styles.skCircle8, styles.skChild)} />
      <div className={joinClasses(styles.skCircle9, styles.skChild)} />
      <div className={joinClasses(styles.skCircle10, styles.skChild)} />
      <div className={joinClasses(styles.skCircle11, styles.skChild)} />
      <div className={joinClasses(styles.skCircle12, styles.skChild)} />
    </div>
  );
}
