import { useState, useCallback } from "react";
import { Card } from "./Card";
import update from "immutability-helper";
import { Button } from "antd";
const style = {
  width: "100%",
};
export default function Container({ item, restaurant_id, updateInDb }) {
  const { menukind, id, _id } = item;
  const [groepen, setGroepen] = useState(menukind);
  const moveGroep = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = groepen[dragIndex];
      setGroepen(
        update(groepen, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [groepen]
  );
  // const renderCard = (card, index) => {
  //   return (
  //     <Card
  //       key={card.id}
  //       index={index}
  //       id={card.id}
  //       text={card.text}
  //       moveCard={moveCard}
  //     />
  //   );
  // };
  const renderGroep = (groep, index) => {
    return (
      <Card
        key={groep}
        index={index}
        id={groep}
        text={groep}
        moveCard={moveGroep}
      />
    );
  };
  // return <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>;
  return (
    <div>
      <div style={style}>
        {groepen.map((groep, i) => renderGroep(groep, i))}
      </div>
      <div id="dndButton">
        <Button
          type="primary"
          onClick={() =>
            updateInDb({ restaurant_id, id, oldId: id, _id, menukind: groepen })
          }
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
