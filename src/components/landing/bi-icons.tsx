// Bootstrap Icons (https://icons.getbootstrap.com/), MIT licensed, inlined as
// components for the landing page only — the rest of the app uses lucide-react
// (see docs/BEST_PRACTICES.md). Source SVG paths copied verbatim from the
// bootstrap-icons package, unmodified.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function BiBase({ size = 20, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
    />
  );
}

export function BiArrowRightCircleFill(props: IconProps) {
  return (
    <BiBase {...props}>
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
    </BiBase>
  );
}
