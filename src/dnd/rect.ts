export const a = 1;

export type PLACE_POSITION = 'PLACE_BEFORE' | 'PLACE_AFTER' | 'NONE';

export const getVerticalPlacement = (rect: ClientRect, yPosition: number): PLACE_POSITION => {
  const middlePoint = (rect.bottom + rect.top) / 2;
  if (middlePoint >= yPosition)
    return 'PLACE_BEFORE';
  else
    return 'PLACE_AFTER';
};
