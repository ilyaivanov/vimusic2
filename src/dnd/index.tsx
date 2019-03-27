import React, {useState} from 'react'
import Card from './Card'
import update from 'immutability-helper'


const style = {
  width: 400,
}

export interface ContainerState {
  cards: Array<{
    id: number
    text: string
  }>
}

const Container: React.FC = ({}) => {
  {
    const [cards, setCards] = useState([
      {
        id: 1,
        text: 'Write a cool JS library',
        level: 0,
      },
      {
        id: 2,
        text: 'Make it generic enough',
        level: 0,
      },
      {
        id: 3,
        text: 'Write README',
        level: 1,
      },
      {
        id: 4,
        text: 'Create some examples',
        level: 1,
      },
      {
        id: 5,
        text:
          'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        level: 2,
      },
      {
        id: 6,
        text: '???',
        level: 0,
      },
      {
        id: 7,
        text: 'PROFIT',
        level: 0,
      },
    ]);

    const moveCard = (dragIndex: number, hoverIndex: number) => {
      setCards(
        update(cards, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, cards[dragIndex]]],
        }),
      )
    }
    const setLevel = (index: number, level: number) => {
      setCards(
        update(cards, {
          [index]: {$merge: {level}}
        }),
      )
    }

    return (
      <div style={style}>
        {cards.map((card, i) => (
          <Card
            level={card.level}
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            setLevel={setLevel}
          />
        ))}
      </div>
    )
  }
}

export default Container
