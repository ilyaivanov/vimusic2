import {TreeNode} from "./types";

export default {
  '1': {
    id: '1',
    text: 'Level 1',
  },
  '2': {
    id: '2',
    text: 'Level 2',
    children: ['3', '4', '8']
  },
  '3': {
    id: '3',
    text: 'Write README',
  },
  '4': {
    id: '4',
    text: 'Create some examples',
    children: ['5']
  },
  '5': {
    id: '5',
    text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
  },
  '6': {
    id: '6',
    text: 'Level 3',
  },
  '7': {
    id: '7',
    text: 'Final',
  },
  '8': {
    id: '8',
    text: 'Subchild',
  },
} as TreeNode;


//https://picsum.photos/g/50/50/?length=30
