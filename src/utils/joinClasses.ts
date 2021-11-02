import { MaybeUndef } from "src/types/UtilityTypes";

/**
 * Joins the passed-in CSS classes with a space.
 */
export default function joinClasses(
  ...cssClasses: Array<MaybeUndef<string>>
): string {
  return cssClasses.filter((className) => className != null).join(" ");
}
