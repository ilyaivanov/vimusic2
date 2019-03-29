import React, {Component} from "react";
import {Node, TreeNode} from "./types";
import {nodes, rootNodes} from "./initialState";
import Dnd from './dnd';
import DragDropContext from "./DragDropContext";

interface State {
  nodes: TreeNode,
  rootNodes: string[]
}

interface Props {

}

export default class App extends Component<Props, State> {
  state = {
    nodes,
    rootNodes
  };

  onClick = (node: Node) => {
    let nodes = {...this.state.nodes};
    nodes[node.id] = {
      ...nodes[node.id],
      isChildrenHidden: !nodes[node.id].isChildrenHidden
    };
    this.setState({nodes});
  };

  render() {
    return (
      <DragDropContext>
        <Dnd/>
        {/*<Tree*/}
          {/*nodes={this.state.nodes}*/}
          {/*onClick={this.onClick}*/}
          {/*level={0}*/}
          {/*nodesOnLevel={this.state.rootNodes}/>*/}
      </DragDropContext>
    );
  }
}

