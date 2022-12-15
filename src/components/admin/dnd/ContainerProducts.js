import { useState, useCallback, useEffect } from "react";
import { Card } from "./Card";
import update from "immutability-helper";
import { Button } from "antd";
const style = {
  width: "100%",
};
export default function ContainerProducts({
  originProducts,
  restaurant_id,
  updateInDb,
  selectedCat,
}) {
  const [products, setProducts] = useState(originProducts);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    setProducts(originProducts);
  }, [selectedCat, JSON.stringify(originProducts)]);
  const handleSubmit = () => {
    const fixedProducts = [...products];
    const fixedOriginProducts = [...originProducts];
    const doSomethingAsync = async (prod, index) => {
      const targetId = fixedOriginProducts[index].id;
      if (prod.id !== targetId) {
        return updateInDb({
          restaurant_id,
          oldId: prod.id,
          id: targetId,
          _id: prod._id,
          ignoreIdDuplication: true,
        });
      } else {
        return Promise.resolve("ok");
      }
    };
    const pasallesaan = async () => {
      return Promise.all(
        fixedProducts.map((prod, index) => doSomethingAsync(prod, index))
      );
    };
    // const fixedProducts = [...products];
    // const fixedOriginProducts = [...originProducts];
    // fixedProducts.forEach((prod, index) => {
    //   const targetId = fixedOriginProducts[index].id;
    //   console.log(prod.id, targetId);
    //   if (prod.id !== targetId) {
    //     updateInDb({
    //       restaurant_id,
    //       oldId: prod.id,
    //       id: targetId,
    //       ignoreIdDuplication: true,
    //     });
    //   }
    // });
    pasallesaan().then(() => {
      // window.location.reload(false);
      forceUpdate();
    });
  };
  const moveProduct = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = products[dragIndex];
      setProducts(
        update(products, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [products]
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
  console.log(products.length);
  const renderProduct = (prod, index) => {
    return (
      <Card
        key={prod._id}
        index={index}
        id={prod._id}
        text={prod.title}
        moveCard={moveProduct}
      />
    );
  };
  // return <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>;

  return (
    <div>
      <div style={style}>
        {products.map((prod, i) => renderProduct(prod, i))}
      </div>
      <div id="dndButton">
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
