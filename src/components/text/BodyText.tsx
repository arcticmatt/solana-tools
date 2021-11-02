import ColorClass from "src/types/enums/ColorClass";
import FontClass from "src/types/enums/FontClass";
import joinClasses from "src/utils/joinClasses";

export type Props = {
  children:
    | number
    | string
    | JSX.Element
    | Array<JSX.Element | string | number | boolean>;
  className?: string;
  colorClass?: ColorClass;
  display?: string;
  fontClass: FontClass;
  style?: { [key: string]: any };
  textAlign?: "center" | "left" | "right";
  textTransform?: "none" | "uppercase";
};

export default function BodyText({
  children,
  className,
  colorClass = ColorClass.Primary,
  display,
  fontClass,
  style,
  textAlign,
  textTransform,
}: Props): JSX.Element {
  const classNameJoined = joinClasses(fontClass, className, colorClass);

  const styleToUse = {
    ...(textAlign != null ? { textAlign } : {}),
    ...(textTransform != null ? { textTransform } : {}),
    ...(display != null ? { display } : {}),
    ...style,
  };

  switch (fontClass) {
    case FontClass.Body1:
    case FontClass.Body1Bold:
    case FontClass.Body1Medium:
    case FontClass.Body1SemiBold:
    case FontClass.Body2:
    case FontClass.Body2Medium:
    case FontClass.Body2SemiBold:
    case FontClass.Body3:
    case FontClass.Body3SemiBold:
    case FontClass.SmallCaps:
      return (
        <div className={classNameJoined} style={styleToUse}>
          {children}
        </div>
      );
    default:
      throw new Error(`Unexpected fontClass of ${fontClass}`);
  }
}
