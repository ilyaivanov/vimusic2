import Video from "./Video";
import React, {Fragment} from "react";
import {TreeNode} from "../types";
import Separator, {marginStep} from "./Separator";

interface TreeProps {
  nodes: TreeNode;
  nodesOnLevel: string[];
  level: number;
  onClick: any;
}

const Tree = ({nodes, nodesOnLevel, onClick, level}: TreeProps) => <Fragment>
  {nodesOnLevel.map((nodeId: string) => (
    <Fragment key={nodes[nodeId].id}>
      <Video node={nodes[nodeId]} onClick={onClick} style={{paddingLeft: marginStep * level}}/>
      <Separator level={level}/>
      {
        (nodes[nodeId].children && nodes[nodeId].isChildrenHidden) &&
        <Tree
          nodesOnLevel={nodes[nodeId].children as string[]}
          level={level + 1}
          onClick={onClick}
          nodes={nodes}/>
      }
    </Fragment>
  ))}
</Fragment>;

export default Tree;
