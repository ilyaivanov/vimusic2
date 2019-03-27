import React, {Fragment, useState} from 'react'
import Card from './Card'
import update from 'immutability-helper'

const nodes = {
  '1': {
    id: 1,
    text: 'Write a cool JS library',
  },
  '2': {
    id: 2,
    text: 'Make it generic enough',
    // children: ['3', '4']
  },
  '3': {
    id: 3,
    text: 'Write README',
  },
  '4': {
    id: 4,
    text: 'Create some examples',
    // children: ['5']
  },
  '5': {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
  },
  '6': {
    id: 6,
    text: '???',
  },
  '7': {
    id: 7,
    text: 'PROFIT',
  },
};
const rootNodes = [
  '1', '2', '6', '7'
];

const Container: React.FC = ({}) => {
  const [cards, setCards] = useState(nodes) as any;
  const [roots, setRoot] = useState(rootNodes);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    console.log(dragIndex, hoverIndex);
    setRoot(
      update(roots, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, roots[dragIndex]]],
      }),
    )
  };

  const setLevel = (index: number, level: number) => {
    console.log(index, level);
  };

  return (
    <div>
      <Tree nodes={cards}
            level={0}
            nodesOnLevel={roots}
            moveCard={moveCard}
            setLevel={setLevel}
            startIndex={0}/>
    </div>
  )
};

interface TreeProps {
  nodes: TreeNode;
  nodesOnLevel: string[];
  level: number;
  startIndex: number;
  moveCard: any;
  setLevel: any;
}

export interface TreeNode {
  [id: string]: { id: string, text: string, children: string[] };
}

const Tree = ({nodes, nodesOnLevel, level, startIndex, moveCard, setLevel}: TreeProps) => (
  <Fragment>
    {
      nodesOnLevel.map((id, i) => {
        const card = nodes[id];
        return <div key={card.id}>
          <Card
            level={level}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            setLevel={setLevel}
          />
          {
            card.children &&
            <Tree
              nodes={nodes}
              nodesOnLevel={card.children}
              level={level + 1}
              moveCard={moveCard}
              setLevel={setLevel}
              startIndex={0}/>
          }
        </div>
      })
    }
  </Fragment>
);

export default Container
