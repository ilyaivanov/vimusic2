import React, {useImperativeHandle, useRef} from "react";
import {CardInstance, CardProps} from "./types";
import {hintHeight, PADDING_PER_LEVEL} from "./constant";
import dropTarget from "./dropTarget";
import dragSource from "./dragSource";

const RowItem: React.RefForwardingComponent<HTMLDivElement, CardProps> =
  React.forwardRef(
    ({text, isDragging, id, connectDragSource, connectDragPreview, placementLevel, placement = 'NONE', connectDropTarget, setPlacement, level, isOver, index}, ref) => {
      const elementRef = useRef(null);

      useImperativeHandle<{}, CardInstance>(ref, () => ({
        getNode: () => elementRef.current,
      }));

      return connectDropTarget(
        <div className="card-stripe"
             ref={elementRef}
             style={{paddingLeft: 10 + level * PADDING_PER_LEVEL,}}>
          {connectDragPreview(
            <div className="card-container">
              {connectDragSource(<div className="drag-handle"/>)}
              {text}
            </div>)
          }
          {
            placement === 'PLACE_AFTER' &&
            <PlacementLabel style={{bottom: -(hintHeight / 2), left: placementLevel * PADDING_PER_LEVEL}}/>
          }
          {
            placement === 'PLACE_BEFORE' &&
            <PlacementLabel style={{top: -(hintHeight / 2), left: placementLevel * PADDING_PER_LEVEL}}/>
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

export default dropTarget(dragSource(RowItem));
