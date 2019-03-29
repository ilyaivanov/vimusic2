import React from 'react';

import {storiesOf} from '@storybook/react';
import Card from "../dnd/Card";
import DragDropContext from '../DragDropContext';

storiesOf('Tree', module)
  .add('Card 1 before', () => <DragDropContext>
    <Card
      placement="PLACE_BEFORE"
      placementLevel={0}
      setPlacement={() => 42}
      id={'1'}
      text={'Card 1'}
    />
    <Card
      setPlacement={() => 42}
      id={'2'}
      text={'Card 2'}
    />
  </DragDropContext>).add('Card 1 after', () => <DragDropContext>
    <Card
      setPlacement={() => 42}
      placement="PLACE_AFTER"
      placementLevel={0}
      id={'1'}
      text={'Card 1'}
    />
    <Card
      setPlacement={() => 42}
      id={'2'}
      text={'Card 2'}
    />
  </DragDropContext>).add('Card 2 before', () => <DragDropContext>
    <Card
      setPlacement={() => 42}
      id={'1'}
      text={'Card 1'}
    />
    <Card
      placement="PLACE_BEFORE"
      placementLevel={0}
      setPlacement={() => 42}
      id={'2'}
      text={'Card 2'}
    />
  </DragDropContext>).add('Card 2 after', () => <DragDropContext>
    <Card
      setPlacement={() => 42}
      id={'1'}
      text={'Card 1'}
    />
    <Card
      placement="PLACE_AFTER"
      placementLevel={0}
      setPlacement={() => 42}
      id={'2'}
      text={'Card 2'}
    />
  </DragDropContext>);
