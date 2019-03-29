import {DropTarget, DropTargetConnector, DropTargetMonitor} from "react-dnd";
import {CardInstance, CardProps} from "./types";
import {getVerticalPlacement} from "./utils";
import {PADDING_PER_LEVEL} from "./constant";

export default DropTarget(
  'CARD',
  {
    drop(props: CardProps, monitor: DropTargetMonitor) {
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
      const clientOffset = monitor.getClientOffset() as { y: number };

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
)
