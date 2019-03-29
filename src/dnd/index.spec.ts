import {isSubchild, nodes} from "./index";

export const a = 1;
it('sample', () => {
  expect(isSubchild(nodes, '2', '3')).toEqual(true);
});

it('sample', () => {
  expect(isSubchild(nodes, '3', '3')).toEqual(false);
});

it('sample', () => {
  expect(isSubchild(nodes, '2', '5')).toEqual(true);
});

it('sample', () => {
  expect(isSubchild(nodes, '2', '1')).toEqual(false);
});
