import React, {Fragment, useState} from 'react'
import Card from './RowItem';
import {getRoots, isSubchild} from "./utils";
import {PLACE_POSITION, TreeNode} from "./types";


const Container = ({nodes, onDrop}: any) => {
  const [placement, setPlacement] = useState({});

  const canMove = (dragId: string, dropId: string) => {
    return !isSubchild(nodes, dragId, dropId);
  };

  const onCardDrop = (itemId: string) =>
    onDrop(itemId, placement);

  const updatePlacement = (id: string, position: PLACE_POSITION, level: number) => {
    setPlacement({id, position, level});
  };

  return (
    <Tree nodes={nodes}
          nodesOnLevel={getRoots(nodes)}
          onDrop={onCardDrop}
          canMove={canMove}
          placement={placement}
          setPlacement={updatePlacement}/>
  )
};

interface TreeProps {
  nodes: TreeNode;
  nodesOnLevel: string[];
  level?: number;
  canMove: any;
  onDrop: any;
  setPlacement: any;
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
            placement={props.placement.id === id ? props.placement.position : undefined}
            placementLevel={props.placement.id === id ? props.placement.level : undefined}
            id={card.id}
            text={card.text}
            onDrop={props.onDrop}
            setPlacement={props.setPlacement}
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
