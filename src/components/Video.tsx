export const a = 1;
// import React, {useState} from "react";
// // import {Node} from "../types";
//
// import "./video.css";
// import Tag from "./Tag";
//
// interface Props {
//   node: Node;
//   style: {};
//   onClick: (node: Node) => void;
// }
//
// export default React.memo(({node, onClick, style}: Props) => {
//     const [activeButton, setActiveButton] = useState("similar");
//     return <div className="video-container"
//                 style={style}
//                 onClick={() => onClick(node)}>
//       <div className={node.isChildrenHidden ? "arrow-down" : "arrow-right"}/>
//       <img style={{borderRadius: 3, paddingLeft: 10, paddingRight: 10}} src={node.imageUrl} alt="Image"/>
//       <div className="tags">
//         <div style={{fontSize: 18}}>{node.title}</div>
//         {
//           node.isChildrenHidden &&
//           <div>
//             <Tag text="Similar" isActive={activeButton === "similar"} onPress={() => setActiveButton("similar")}/>
//             <Tag text="Channel" isActive={activeButton === "channel"} onPress={() => setActiveButton("channel")}/>
//           </div>
//         }
//       </div>
//     </div>;
//   }
// );
