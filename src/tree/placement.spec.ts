import {dropAt} from "./placement";
import {Placement} from "./types";
import initial from "./initial";

it('placing the first item to the end', () => {
  const placement: Placement = {
    itemId: '8',
    position: 'PLACE_AFTER'
  };
  expect(dropAt(initial, '1', placement).roots.children)
    .toEqual(["2", "3", "4", "5", "6", "7", "8", '1']);
});

it('placing the first item to the second level after 2', () => {
  const placement: Placement = {
    itemId: '2',
    position: 'PLACE_AFTER',
    placeInside: true,
  };
  const result = dropAt(initial, '1', placement);

  expect(result.roots.children)
    .toEqual(["2", "3", "4", "5", "6", "7", "8"]);

  expect(result['2'].children).toEqual(['1']);
});

it('placing the first item to the second level before 3', () => {
  const placement: Placement = {
    itemId: '3',
    position: 'PLACE_BEFORE',
    placeInside: true,
  };
  const result = dropAt(initial, '1', placement);

  expect(result.roots.children)
    .toEqual(["2", "3", "4", "5", "6", "7", "8"]);

  expect(result['2'].children).toEqual(['1']);
});
