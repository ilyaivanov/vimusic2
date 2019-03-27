import React, {useImperativeHandle, useRef} from 'react'
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

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',

}

export interface CardProps {
  id: any
  text: string
  index: number
  level: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  setLevel: (dragIndex: number, level: number) => void

  isDragging: boolean
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
  connectDragPreview: ConnectDragPreview
}

interface CardInstance {
  getNode(): HTMLDivElement | null
}

const Card: React.RefForwardingComponent<HTMLDivElement,
  CardProps> = React.forwardRef(
  ({text, isDragging, connectDragSource, connectDragPreview, connectDropTarget, level}, ref) => {
    const elementRef = useRef(null)
    connectDragPreview(elementRef)
    // connectDropTarget(elementRef)

    const opacity = isDragging ? 0 : 1;
    useImperativeHandle<{}, CardInstance>(ref, () => ({
      getNode: () => elementRef.current,
    }))
    return connectDropTarget(<div style={{backgroundColor: '#ebebeb'}}>
        <div style={{backgroundColor: isDragging ? 'lightGrey' : undefined, marginLeft: level * 30}}>
          <div ref={elementRef} style={{...style, opacity}}>
            {connectDragSource(<div style={{width: 10, cursor: 'move', height: 10, backgroundColor: 'black'}}/>)}
            {text}
          </div>
        </div>
      </div>
    )
  },
)

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
      const node = component.getNode()
      if (!node) {
        return null
      }

      const dragIndex = monitor.getItem().index
      const hoverIndex = props.index


      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset() as XYCoord

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      let differenceFromInitialOffset = monitor.getSourceClientOffset() || {x: 0};

      // const diff = clientOffset.x - hoverBoundingRect.left;
      const diff = differenceFromInitialOffset.x;

      let level = Math.floor((diff - 15) / 30);
      console.log(diff, level);
      if (props.level !== level)
        props.setLevel(dragIndex, level);

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    },
  },
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag: (props: CardProps) => ({
        id: props.id,
        index: props.index,
      }),
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    }),
  )(Card),
)
