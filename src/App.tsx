import React, {Component} from "react";
import Tree from "./components/Tree";
import {Node, TreeNode} from "./types";
import {nodes, rootNodes} from "./initialState";
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'
import Dnd from './dnd';

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
    let nodes = {...this.state.nodes};
    nodes[node.id] = {
      ...nodes[node.id],
      isChildrenHidden: !nodes[node.id].isChildrenHidden
    };
    this.setState({nodes});
  };

  render() {
    return (
      <div>
        <Dnd/>
        <Tree
          nodes={this.state.nodes}
          onClick={this.onClick}
          level={0}
          nodesOnLevel={this.state.rootNodes}/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
