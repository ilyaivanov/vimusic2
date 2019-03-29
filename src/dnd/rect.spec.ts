import {getVerticalPlacement} from "./rect";


describe('having a box with top 100 and bottom of 200 ', () => {
  const top = 100;
  const bottom = 200;

  describe('having a pointer at y coordiate of ', () => {
    it('124 position it should emulate placing before element', () => {
      expect(getVerticalPlacement({top, bottom} as any, 124)).toEqual('PLACE_BEFORE');
    });

    it('125 position it should be placed inside element', () => {
      expect(getVerticalPlacement({top, bottom} as any, 150)).toEqual('PLACE_BEFORE');
    });

    it('175 position it should be placed inside element', () => {
      expect(getVerticalPlacement({top, bottom} as any, 151)).toEqual('PLACE_AFTER');
    });

    it('176 position it should emulate placing within element', () => {
      expect(getVerticalPlacement({top, bottom} as any, 176)).toEqual('PLACE_AFTER');
    });
  });


});
