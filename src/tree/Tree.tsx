import React, {Fragment, useState} from 'react'
import Card from './RowItem';
import {isSubchild} from "./utils";
import {PLACE_POSITION, TreeNode} from "./types";


const Container = ({nodes, onDrop}: any) => {
  const [placement, setPlacement] = useState({});

  const canMove = (dragId: string, dropId: string) => {
    return !isSubchild(nodes, dragId, dropId);
  };

  const onCardDrop = (itemId: string) => {
    onDrop(itemId, placement);
    setPlacement({itemId: undefined, position: 'NONE', level: undefined});
  };

  const updatePlacement = (itemId: string, position: PLACE_POSITION, level: number, placeInside: boolean) => {
    setPlacement({itemId, position, level, placeInside});
  };

  return (
    <Tree nodes={nodes}
          nodesOnLevel={nodes.roots.children}
          onDrop={onCardDrop}
          canMove={canMove}
          placement={placement}
          updatePlacement={updatePlacement}/>
  )
};

interface TreeProps {
  nodes: TreeNode;
  nodesOnLevel: string[];
  level?: number;
  canMove: any;
  onDrop: any;
  updatePlacement: any;
  placement: any;
}

const Tree = (props: TreeProps) => (
  <Fragment>
    {
      props.nodesOnLevel.map((id, index) => {
        const card = props.nodes[id];
        return <Fragment key={card.id}>
          <Card
            isFirst={index === 0}
            level={props.level || 0}
            canMove={props.canMove}
            placement={props.placement.itemId === id ? props.placement.position : undefined}
            placementLevel={props.placement.itemId === id ? props.placement.level : undefined}
            id={card.id}
            text={card.text}
            onDrop={props.onDrop}
            updatePlacement={props.updatePlacement}
          />
          {
            card.children &&
            <Tree
              {...props}
              nodesOnLevel={card.children}
              level={(props.level || 0) + 1}/>
          }
        </Fragment>
      })
    }
  </Fragment>
);

export default Container
