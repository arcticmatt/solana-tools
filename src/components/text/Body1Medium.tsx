import BodyText from "src/components/text/BodyText";
import FontClass from "src/types/enums/FontClass";
import type { Props } from "src/components/text/BodyText";

export default function Body1Medium(props: Omit<Props, "fontClass">) {
  return <BodyText {...props} fontClass={FontClass.Body1Medium} />;
}
