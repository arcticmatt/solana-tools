import ElementId from "src/types/enums/ElementId";
import containerStyles from "@/css/ResponsiveContainer.module.css";
import joinClasses from "src/utils/joinClasses";

type Props = {
  children: any;
  className?: string;
  height?: string;
  id?: ElementId;
};

export default function ResponsiveContainer({
  children,
  className,
  height,
  id,
}: Props): JSX.Element {
  return (
    <div
      className={joinClasses(containerStyles.container, className)}
      id={id}
      style={height != null ? { height } : {}}
    >
      {children}
    </div>
  );
}
