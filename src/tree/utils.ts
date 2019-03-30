import {PLACE_POSITION, TreeNode} from "./types";

export const getRoots = (nodes: TreeNode): string[] =>
  Object
    .keys(nodes)
    .filter(nodeId => !getParentKey(nodes, nodeId));

export const getParentKey = (nodes: TreeNode, nodeId: string): string | undefined =>
  Object.keys(nodes).find(key => contains(nodes[key].children, nodeId));


export const getVerticalPlacement = (rect: ClientRect, yPosition: number): PLACE_POSITION => {
  const middlePoint = (rect.bottom + rect.top) / 2;
  if (middlePoint >= yPosition)
    return 'PLACE_BEFORE';
  else
    return 'PLACE_AFTER';
};

export const isSubchild = (nodes: TreeNode, parentId: string, childId: string): boolean => {
  const childs = nodes[parentId].children;
  if (!childs || childs.length === 0)
    return false;

  return childs.reduce((isChild, child) =>
    isChild || (child === childId) || isSubchild(nodes, child, childId)
    , false);
};

export const getPreviousNodeId = (nodes: TreeNode, nodeId: string) => {
  const parent = getParentKey(nodes, nodeId);
  const context = (parent ? nodes[parent].children : nodes.roots.children) as string[];
  const index = context.indexOf(nodeId);
  return context[index - 1];
};

//Array utils
function contains<T>(array: T[] | undefined, item: T): boolean {
  return !!array && array.indexOf(item) >= 0;
}
