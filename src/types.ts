export interface Node {
  imageUrl: string;
  title: string;
  id: string;
  isChildrenHidden?: boolean;
  children?: string[];
}

export interface TreeNode {
  [id: string]: Node;
}
