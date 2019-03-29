import React, {useEffect, useImperativeHandle, useRef} from 'react'
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
import ItemTypes from './ItemTypes'
import {XYCoord} from 'dnd-core'
import {getVerticalPlacement, PLACE_POSITION} from "./rect";

const style = {
  display: 'flex',
  alignItems: 'center',
};
const dragHandleStyle = {
  width: 10, cursor: 'move', height: 10, backgroundColor: 'black', marginRight: 10
};

export interface CardProps {
  id: any
  text: string
  index: number
  level: number
  placementLevel: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  setLevel: (dragIndex: number, level: number) => void
  canMove: (dragId: string, dropId: string) => boolean
  setPlacement: (id: string, placemnt: PLACE_POSITION, placementLevel?: number) => void
  placement: PLACE_POSITION

  isDragging: boolean
  isOver: boolean
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
  connectDragPreview: ConnectDragPreview

}

interface CardInstance {
  getNode(): HTMLDivElement | null
}

const PADDING_PER_LEVEL = 30;

const Card: React.RefForwardingComponent<HTMLDivElement, CardProps> =
  React.forwardRef(
    ({text, isDragging, id, connectDragSource, connectDragPreview, placementLevel, placement = 'NONE', connectDropTarget, setPlacement, level, isOver, index}, ref) => {
      useEffect(() => {
        if (!isOver) {
          setPlacement(id, 'NONE', undefined)
        }
      }, [isOver]);

      const elementRef = useRef(null);
      // connectDragPreview(elementRef);

      useImperativeHandle<{}, CardInstance>(ref, () => ({
        getNode: () => elementRef.current,
      }));

      return connectDropTarget(
        <div className="card-stripe" style={{paddingLeft: level * PADDING_PER_LEVEL}}>
          <div ref={elementRef} style={{...style, paddingLeft: 10, height: 50}}>
            {connectDragPreview(
              <div style={style}>
                {connectDragSource(<div style={dragHandleStyle}/>)}
                {text} ... {placement} ... {placementLevel} ... {isDragging && 'Dragging'}
              </div>)
            }
          </div>
        </div>
      );
    },
  );

export default DropTarget(
  ItemTypes.CARD,
  {
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
      const placementLevel = Math.floor((diff - 15) / PADDING_PER_LEVEL);

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
    ItemTypes.CARD,
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
  )(Card),
)
