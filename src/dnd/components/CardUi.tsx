import React, {useEffect, useImperativeHandle, useRef} from "react";
import {CardProps} from "../Card";
import {PADDING_PER_LEVEL} from "./constants";
import {CardInstance} from "./types";

const style = {
  display: 'flex',
  alignItems: 'center',
};
const dragHandleStyle = {
  width: 10, cursor: 'move', height: 10, backgroundColor: 'black', marginRight: 10
};

const hintHeight = 10;

const CardUi: React.RefForwardingComponent<HTMLDivElement, CardProps> =
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
        <div className="card-stripe"
             ref={elementRef}
             style={{
               ...style,
               paddingLeft: 10 + level * PADDING_PER_LEVEL,
               height: 50,
               position: 'relative',
             }}>
          {connectDragPreview(
            <div style={style}>
              {connectDragSource(<div style={dragHandleStyle}/>)}
              {text} ... {isDragging && 'Dragging'}
            </div>)
          }
          {
            placement === 'PLACE_AFTER' &&
            <PlacementLabel style={{bottom: -(hintHeight/2), left: placementLevel * PADDING_PER_LEVEL}}/>
          }
          {
            placement === 'PLACE_BEFORE' &&
            <PlacementLabel style={{top: -(hintHeight/2), left: placementLevel * PADDING_PER_LEVEL}}/>
          }
        </div>
      );
    },
  );
const PlacementLabel = ({style}: any) =>
  <div className="drag-hint" style={{
    height: hintHeight,
    ...style
  }}/>;

export default CardUi;
