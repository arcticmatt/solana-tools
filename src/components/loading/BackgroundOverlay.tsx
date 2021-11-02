import ElementId from "src/types/enums/ElementId";
import joinClasses from "src/utils/joinClasses";
import styles from "@/css/loading/BackgroundOverlay.module.css";

type Props = {
  children?: JSX.Element | Array<JSX.Element>;
  className?: string;
};

export default function BackgroundOverlay({
  children,
  className,
}: Props): JSX.Element {
  return (
    <div
      className={joinClasses(styles.backgroundOverlay, className)}
      id={ElementId.BackgroundOverlay}
    >
      {children}
    </div>
  );
}
