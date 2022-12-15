import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ContainerProducts from "../dnd/ContainerProducts";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;
export default function Productdnd({
  originProducts,
  updateInDb,
  selectedCat,
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ContainerProducts
        originProducts={originProducts}
        restaurant_id={restaurant_id}
        updateInDb={updateInDb}
        selectedCat={selectedCat}
      />
    </DndProvider>
  );
}
