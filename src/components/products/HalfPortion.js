import React from "react";
import { Select } from "antd";
import { changeFormat } from "Utilities/gegevens";
const { Option } = Select;
export default function HalfPortion({
  halfPortion,
  setHalfPortion,
  price_half,
  productPrice,
}) {
  return (
    <div>
      <h3>Portie:</h3>
      <Select
        value={halfPortion}
        style={{ diplay: "inline" }}
        onChange={(value) => setHalfPortion(value)}
      >
        <Option value={false}>hele portie</Option>
        <Option value={true}>
          Halve portie ( - {changeFormat(productPrice - price_half)})
        </Option>
      </Select>
    </div>
  );
}
