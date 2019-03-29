import React from 'react';

import {storiesOf} from '@storybook/react';
import RowItem from "../tree/RowItem";
import DragDropContext from '../DragDropContext';

storiesOf('Tree', module)
  .add('Card 1 before', () => <DragDropContext>
    <RowItem
      placement="PLACE_BEFORE"
      placementLevel={0}
      setPlacement={() => 42}
      id={'1'}
      text={'Card 1'}
    />
    <RowItem
      setPlacement={() => 42}
      id={'2'}
      text={'Card 2'}
    />
  </DragDropContext>).add('Card 1 after', () => <DragDropContext>
    <RowItem
      setPlacement={() => 42}
      placement="PLACE_AFTER"
      placementLevel={0}
      id={'1'}
      text={'Card 1'}
    />
    <RowItem
      setPlacement={() => 42}
      id={'2'}
      text={'Card 2'}
    />
  </DragDropContext>).add('Card 2 before', () => <DragDropContext>
    <RowItem
      setPlacement={() => 42}
      id={'1'}
      text={'Card 1'}
    />
    <RowItem
      placement="PLACE_BEFORE"
      placementLevel={0}
      setPlacement={() => 42}
      id={'2'}
      text={'Card 2'}
    />
  </DragDropContext>).add('Card 2 after', () => <DragDropContext>
    <RowItem
      setPlacement={() => 42}
      id={'1'}
      text={'Card 1'}
    />
    <RowItem
      placement="PLACE_AFTER"
      placementLevel={0}
      setPlacement={() => 42}
      id={'2'}
      text={'Card 2'}
    />
  </DragDropContext>);
