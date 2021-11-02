import styles from "@/css/containers/ContainerOuter.module.css";

type Props = {
  children: any;
};

export default function ContainerOuter({ children }: Props): JSX.Element {
  return <div className={styles.containerOuter}>{children}</div>;
}
