export const a = 1;

export type PLACE_POSITION = 'PLACE_BEFORE' | 'PLACE_AFTER' | 'PLACE_INSIDE' | 'NONE';

export const getVerticalPlacement = (rect: ClientRect, yPosition: number): PLACE_POSITION => {
  const height = rect.bottom - rect.top;
  const area = height / 4;
  if (rect.top + area > yPosition)
    return 'PLACE_BEFORE';

  if (rect.bottom - area < yPosition)
    return 'PLACE_AFTER';

  return 'PLACE_INSIDE';
};
