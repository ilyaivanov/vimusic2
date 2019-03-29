import {DragSource, DragSourceConnector, DragSourceMonitor} from "react-dnd";
import {CardProps} from "./types";

export default DragSource(
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
)
