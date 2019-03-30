import {ConnectDragPreview, ConnectDragSource, ConnectDropTarget} from "react-dnd";

export interface TreeNode {
  [id: string]: { id: string, text: string, children?: string[] };

  roots: { id: string, text: string, children?: string[] };
}

export interface Placement {
  itemId: string;
  position: PLACE_POSITION;
  level?: number;
  placeInside?: boolean;
}

export type PLACE_POSITION = 'PLACE_BEFORE' | 'PLACE_AFTER' | 'NONE';

export interface CardInstance {
  getNode(): HTMLDivElement | null
}

export interface CardProps {
  id: any
  text: string
  index: number
  level: number
  placementLevel: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  onDrop: () => void
  canMove: (dragId: string, dropId: string) => boolean
  updatePlacement: (id: string, placement: PLACE_POSITION, placementLevel?: number, placeInside?: boolean) => void
  placement: PLACE_POSITION

  isDragging: boolean
  isFirst: boolean
  isOver: boolean
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
  connectDragPreview: ConnectDragPreview

}
