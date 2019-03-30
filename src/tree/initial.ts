import {TreeNode} from "./types";
import {getRoots} from "./utils";

const nodes = [
  {
    id: '1',
    text: 'ID 1',
  },
  {
    id: '2',
    text: 'ID 2',
    // children: ['3', '4', '8']
  },
  {
    id: '3',
    text: 'ID 3',
  },
  {
    id: '4',
    text: 'ID 4',
    // children: ['5']
  },
  {
    id: '5',
    text: 'ID 5',
  },
  {
    id: '6',
    text: 'ID 6',
  },
  {
    id: '7',
    text: 'ID 7',
  },
  {
    id: '8',
    text: 'ID 8',
  }
];
const tree = nodes.reduce((o, n) => ({...o, [n.id]: n}), {});

export default {
  ...tree,
  roots: {id: 'roots', text: 'roots', children: getRoots(tree as TreeNode)}
} as TreeNode;


//https://picsum.photos/g/50/50/?length=30
