import React from "react";
import { Node } from "../types";

import "./video.css";

interface Props {
  node: Node;
  style: {};
  onClick: (node: Node) => void;
}

export default React.memo(({ node, onClick, style }: Props) =>
  <div className="video-container"
       style={style}
       onClick={() => onClick(node)}>
    <div className={node.isChildrenHidden ? "arrow-down" : "arrow-right"}/>
    <img style={{ borderRadius: 3, paddingLeft: 10, paddingRight: 10 }} src={node.imageUrl} alt="Image"/>
    <div style={{ fontSize: 18 }}>
      {node.title}
    </div>
  </div>
);
