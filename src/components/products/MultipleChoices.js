import React from "react";
import { Checkbox, Row, Col } from "antd";

function MultipleChoices(props) {
  const {
    index_of_menuKind,
    index_of_options,
    selectOnChange,
    checkboxOptions,
    selectedOptions
  } = props;
  return (
    <Checkbox.Group
      style={{ width: "100%" }}
      value={!selectedOptions[index_of_menuKind] ?[]:selectedOptions[index_of_menuKind].split(',')}
      onChange={selectOnChange.bind(this,index_of_menuKind, index_of_options)}
    >
      <Row>
        {checkboxOptions.map((item) => (
          <Col span={24}>
            <Checkbox value={item.option_title}>{item.option_name}</Checkbox>
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  );
}

export default MultipleChoices;
