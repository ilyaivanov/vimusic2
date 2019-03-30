import {Placement, TreeNode} from "./types";
import update from 'immutability-helper';
import {getPreviousNodeId} from "./utils";

export const dropAt = (nodes: TreeNode, nodeId: string, placement: Placement): TreeNode => {
  const context = nodes.roots.children;
  if (!context || nodeId === placement.itemId && !placement.placeInside)
    return nodes;

  const index = context.indexOf(nodeId);

  //remove from current position
  const newNodes = update(nodes, {
    roots: {
      children:
        {$splice: [[index, 1]]}
    }
  });


  let indexToPlace = context.indexOf(placement.itemId);

  if (placement.position === 'PLACE_BEFORE' && indexToPlace != 0) {
    indexToPlace -= 1;
  }

  if (placement.placeInside) {
    const nodeToInsert = placement.position === 'PLACE_BEFORE' ?
      getPreviousNodeId(nodes, placement.itemId) : placement.itemId;

    return update(newNodes, {
      [nodeToInsert]: {
        children: {
          $apply: ((children: string[]) => children || []),
          $push: [nodeId]
        }
      }
    });
  } else {
    return update(newNodes, {
      roots: {
        children:
          {$splice: [[indexToPlace, 0, nodeId]]}
      }
    })
  }
};
