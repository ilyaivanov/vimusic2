import React from 'react'
import {
  ConnectDragPreview,
  ConnectDragSource,
  ConnectDropTarget,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd'
import {XYCoord} from 'dnd-core'
import {getVerticalPlacement, PLACE_POSITION} from "./rect";
import {PADDING_PER_LEVEL} from "./components/constants";
import {CardInstance} from "./components/types";
import CardUi from "./components/CardUi";

export interface CardProps {
  id: any
  text: string
  index: number
  level: number
  placementLevel: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  onDrop: () => void
  canMove: (dragId: string, dropId: string) => boolean
  setPlacement: (id: string, placemnt: PLACE_POSITION, placementLevel?: number) => void
  placement: PLACE_POSITION

  isDragging: boolean
  isFirst: boolean
  isOver: boolean
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
  connectDragPreview: ConnectDragPreview

}

export default DropTarget(
  'CARD',
  {
    drop(props: CardProps, monitor: DropTargetMonitor){
      // @ts-ignore
      props.onDrop(monitor.getItem().id)
    },
    hover(
      props: CardProps,
      monitor: DropTargetMonitor,
      component: CardInstance,
    ) {
      if (!component) {
        return null
      }
      // node = HTML Div element from imperative API
      const node = component.getNode();
      if (!node || !props.canMove(monitor.getItem().id, props.id)) {
        return null
      }

      const hoverBoundingRect = node.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset() as XYCoord;

      const placement = getVerticalPlacement(hoverBoundingRect, clientOffset.y);


      let differenceFromInitialOffset = monitor.getSourceClientOffset() || {x: 0};
      const diff = differenceFromInitialOffset.x;
      let placementLevel = Math.floor((diff - 5) / PADDING_PER_LEVEL);


      const levelThreshsold = (
        props.placement == 'PLACE_BEFORE' && props.isFirst ||
        props.placement == 'PLACE_AFTER' && monitor.getItem().id == props.id
      )
        ? props.level :
        props.level + 1;


      if (placementLevel > levelThreshsold) {
        placementLevel = levelThreshsold
      }

      if (props.placement != placement || props.placementLevel != placementLevel) {
        props.setPlacement(props.id, placement, placementLevel);
      }
    },
  },
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }),
)(
  DragSource(
    'CARD',
    {
      beginDrag: (props: CardProps) => ({
        id: props.id,
      }),
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),

    }),
  )(CardUi),
)
