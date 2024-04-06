import React from "react";
import { Link } from "../interfaces/Link";

function LinkComponent({
  link,
  openLinkModal
}: {
  link: Link;
  openLinkModal: any;
}) {

  function getLinkStyle(): React.CSSProperties {
    return {
      position: "absolute",
      top: `${link.startY}px`,
      left: `${link.startX}px`,
      height: "2px",
      width: `${link.length}px`,
      backgroundColor: "black",
      zIndex: "1",
      rotate: link.isDecreasing
        ? "-" + link.degreeToBeApplied + "deg"
        : link.degreeToBeApplied + "deg",
    };
  }

  return <>{link !== null && <div onClick={() => openLinkModal(link)} style={getLinkStyle()}></div>}</>;
}

export default LinkComponent;
