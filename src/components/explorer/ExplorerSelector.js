import React, { Component } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import styles from "../../css/layout.less";
import { withRouter } from "dva/router";
import gegevens from "Utilities/gegevens";
const { Option } = Select;

class ExplorerSelector extends Component {
  static propTypes = {};
  state = {
    selectedValue: "cat1",
  };
  handleChange = (selectedValue) => {
    const link = gegevens.homePage
      ? `/online_bestellen#${selectedValue}`
      : `/#${selectedValue}`;
    this.setState({ selectedValue });
    this.props.history.push(link);
  };
  render() {
    const { categories } = this.props.categories;
    const { products } = this.props.products;
    const afhalenbezorgenproducts = products.filter(
      (prod) =>
        !Array.isArray(prod.usedAt) ||
        prod.usedAt.length === 0 ||
        prod.usedAt.includes("afhalen/bezorgen")
    );
    const options =
      Array.isArray(categories) === true
        ? categories
            .filter((cat) => {
              return (
                afhalenbezorgenproducts.findIndex((item) =>
                  item.categorie.includes(cat.cat_code)
                ) > -1
              );
            })
            .map((cat, i) => {
              return (
                <Option
                  key={i}
                  style={{
                    color: "white",
                    background: "black",
                  }}
                  value={cat.cat_code}
                >
                  {cat.cat_name}
                </Option>
              );
            })
        : null;
    return (
      <Select value={this.state.selectedValue} onChange={this.handleChange}>
        {options}
      </Select>
    );
  }
}

export default ExplorerSelector;
