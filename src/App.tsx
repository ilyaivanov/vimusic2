import React, {useState} from "react";
import Tree from './tree/Tree';
import DragDropContext from "./DragDropContext";
import initialNodes from "./tree/initial";
import {dropAt} from "./tree/placement";
import {Placement} from "./tree/types";

export default () => {
  const [nodes, setNodes] = useState(initialNodes);

  const onDrop = (itemId: string, placement: Placement) => {
    const newNodes = dropAt(nodes, itemId, placement);
    console.log(itemId, placement, nodes.roots, newNodes.roots);
    setNodes(newNodes);
  };

  return (
    <DragDropContext>
      <Tree nodes={nodes} onDrop={onDrop}/>
    </DragDropContext>
  )
};
