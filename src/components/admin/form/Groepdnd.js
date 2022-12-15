import { useState, useCallback } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from "../dnd/Container";
export default function Groepdnd({
  setShowGroepdnd,
  item,
  restaurant_id,
  updateInDb,
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <LeftOutlined
          onClick={() => setShowGroepdnd(false)}
          style={{ fontSize: "1.6em", fontWeight: 700, cursor: "pointer" }}
        />
        <div style={{ fontSize: "1.2em", fontWeight: 700 }}>
          Zet de groepen op je gewenste volgorde
        </div>
      </div>
      <div>
        <DndProvider backend={HTML5Backend}>
          <Container
            item={item}
            restaurant_id={restaurant_id}
            updateInDb={updateInDb}
          />
        </DndProvider>
      </div>
    </div>
  );
}
