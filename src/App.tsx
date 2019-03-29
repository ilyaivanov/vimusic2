import React, {useState} from "react";
import Tree from './tree/Tree';
import DragDropContext from "./DragDropContext";
import initialNodes from "./tree/initial";

export default () => {
  const [nodes] = useState(initialNodes);

  const onDrop = (id: string, placement: any) => {
    console.log('OnDrop', id, placement);
  };

  return (
    <DragDropContext>
      <Tree nodes={nodes} onDrop={onDrop}/>
    </DragDropContext>
  )
};
