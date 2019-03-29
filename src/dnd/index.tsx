import React, {Fragment, useState} from 'react'
import Card from './Card'
import update from 'immutability-helper'
import {PLACE_POSITION} from "./rect";
import './index.css';

export interface TreeNode {
  [id: string]: { id: string, text: string, children?: string[], placement?: string; index?: number, placementLevel?: number };
}

export const nodes: TreeNode = {
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
};

export const isSubchild = (nodes: TreeNode, parentId: string, childId: string): boolean => {
  const childs = nodes[parentId].children;
  if (!childs || childs.length === 0)
    return false;

  return childs.reduce((isChild, child) =>
    isChild || (child === childId) || isSubchild(nodes, child, childId)
    , false);
};

const rootNodes = [
  '1', '2', '6', '7'
];

const Container: React.FC = ({}) => {
  const [cards, setCards] = useState(nodes) as any;
  const [roots, setRoot] = useState(rootNodes);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    // console.log(dragIndex, hoverIndex);
    setRoot(
      update(roots, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, roots[dragIndex]]],
      }),
    )
  };

  const setLevel = (index: number, level: number) => {

  };

  const canMove = (dragId: string, dropId: string) => {
    return dragId !== dropId && !isSubchild(nodes, dragId, dropId);
  };


  const setPlacement = (id: string, placement: PLACE_POSITION, placementLevel: number) => {
    setCards(
      update(
        cards,
        {
          [id]: {$merge: {placement, placementLevel}}
        }
      )
    )
  };

  return (
    <div>
      <Tree nodes={cards}
            level={0}
            nodesOnLevel={roots}
            moveCard={moveCard}
            setLevel={setLevel}
            canMove={canMove}
            setPlacement={setPlacement}/>
    </div>
  )
};

interface TreeProps {
  nodes: TreeNode;
  nodesOnLevel: string[];
  level: number;
  moveCard: any;
  canMove: any;
  setLevel: any;
  setPlacement: any;
}


const Tree = ({nodes, nodesOnLevel, level, canMove, moveCard, setLevel, setPlacement}: TreeProps) => (
  <Fragment>
    {
      nodesOnLevel.map((id) => {
        const card = nodes[id];
        return <Fragment key={card.id}>
          <Card
            level={level}
            canMove={canMove}
            placement={card.placement}
            id={card.id}
            text={card.text}
            placementLevel={card.placementLevel}
            moveCard={moveCard}
            setLevel={setLevel}
            setPlacement={setPlacement}
          />
          {
            card.children &&
            <Tree
              nodes={nodes}
              nodesOnLevel={card.children}
              level={level + 1}
              moveCard={moveCard}
              setLevel={setLevel}
              canMove={canMove}
              setPlacement={setPlacement}/>
          }
        </Fragment>
      })
    }
  </Fragment>
);

export default Container
