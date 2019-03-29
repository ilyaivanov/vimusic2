import React, {useState} from "react";
import Tree from './tree/Tree';
import DragDropContext from "./DragDropContext";
import initialNodes from "./tree/initial";
import {dropAt} from "./tree/placement";

export default () => {
  const [nodes, setNodes] = useState(initialNodes);

  const onDrop = (id: string, placement: any) => {
    setNodes(dropAt(nodes, id, placement));
  };

  return (
    <DragDropContext>
      <Tree nodes={nodes} onDrop={onDrop}/>
    </DragDropContext>
  )
};
