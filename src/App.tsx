import React, { Component, Fragment } from "react";
import Video from "./components/Video";
import { Node, TreeNode } from "./types";
import { nodes, rootNodes } from "./initialState";

interface State {
  nodes: TreeNode,
  rootNodes: string[]
}

interface Props {

}

class App extends Component<Props, State> {
  state = {
    nodes,
    rootNodes
  };

  onClick = (node: Node) => {
    let nodes = { ...this.state.nodes };
    nodes[node.id] = {
      ...nodes[node.id],
      isChildrenHidden: !nodes[node.id].isChildrenHidden
    };
    this.setState({ nodes });
  };

  render() {
    return (
      <div>
        <Separator/>
        <Tree nodes={this.state.nodes} onClick={this.onClick} level={0} nodesOnLevel={this.state.rootNodes}/>
      </div>
    );
  }
}

interface TreeProps {
  nodes: TreeNode;
  nodesOnLevel: string[];
  level: number;
  onClick: any;
}

const Tree = ({ nodes, nodesOnLevel, onClick, level }: TreeProps) => <Fragment>
  {nodesOnLevel.map((nodeId: string) => (
    <div key={nodes[nodeId].id}>
      <Video node={nodes[nodeId]} onClick={onClick} style={{ paddingLeft: marginStep * level }}/>
      <Separator level={level}/>
      {
        (nodes[nodeId].children && nodes[nodeId].isChildrenHidden) &&
        <Tree
          nodesOnLevel={nodes[nodeId].children as string[]}
          level={level + 1}
          onClick={onClick}
          nodes={nodes}/>
      }
    </div>
  ))}
</Fragment>;

const marginStep = 20;

const Separator = ({ level = 0 }: { level?: number }) =>
  <div style={{
    height: 1,
    width: "100%",
    backgroundColor: "black",
    marginLeft: 15 + level * marginStep,
    marginTop: 10,
    marginBottom: 10
  }}/>;

export default App;
