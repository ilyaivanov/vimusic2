import React, {Fragment, useState} from 'react'
import Card from './Card'
import update from 'immutability-helper'
import {PLACE_POSITION} from "./rect";

export interface TreeNode {
  [id: string]: { id: string, text: string, children?: string[] };
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
  const [placement, setPlacement] = useState({});

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    setRoot(
      update(roots, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, roots[dragIndex]]],
      }),
    )
  };

  const onDrop = (id: string) => {
    console.log('OnDrop', id, placement);
  };

  const canMove = (dragId: string, dropId: string) => {
    return !isSubchild(nodes, dragId, dropId);
  };

  const updatePlacement = (id: string, position: PLACE_POSITION, level: number) => {
    setPlacement({id, position, level});
  };

  return (
    <div>
      <Tree nodes={cards}
            level={0}
            nodesOnLevel={roots}
            moveCard={moveCard}
            onDrop={onDrop}
            canMove={canMove}
            placement={placement}
            setPlacement={updatePlacement}/>
    </div>
  )
};

interface TreeProps {
  nodes: TreeNode;
  nodesOnLevel: string[];
  level: number;
  moveCard: any;
  canMove: any;
  onDrop: any;
  setPlacement: any;
  placement: any;
}


const Tree = ({nodes, nodesOnLevel, level, canMove, moveCard, onDrop, placement, setPlacement}: TreeProps) => (
  <Fragment>
    {
      nodesOnLevel.map((id, index) => {
        const card = nodes[id];
        return <Fragment key={card.id}>
          <Card
            isFirst={index === 0}
            level={level}
            canMove={canMove}
            placement={placement.id === id ? placement.position : undefined}
            placementLevel={placement.id === id ? placement.level : undefined}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            onDrop={onDrop}
            setPlacement={setPlacement}
          />
          {
            card.children &&
            <Tree
              nodes={nodes}
              nodesOnLevel={card.children}
              level={level + 1}
              moveCard={moveCard}
              onDrop={onDrop}
              canMove={canMove}
              placement={placement}
              setPlacement={setPlacement}/>
          }
        </Fragment>
      })
    }
  </Fragment>
);

export default Container
