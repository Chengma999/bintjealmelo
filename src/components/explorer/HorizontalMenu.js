import ScrollMenu from "react-horizontal-scrolling-menu";
import React, { Component } from "react";
import { Link } from "dva/router";
import styles from "./horizontalmenu.less";
import gegevens from "Utilities/gegevens";
import { IconFont } from "Utilities/toolStore";
const initialSelected = undefined;
class HorizontalMenu extends Component {
  state = {
    selected: initialSelected,
  };

  onSelect = (key) => {
    this.setState({ selected: key });
  };

  render() {
    const { selected } = this.state;
    const {} = this.props;
    let { categories } = this.props.categories;
    let { products } = this.props.products;
    let datasource = [];
    if (Array.isArray(categories)) {
      datasource = categories;
    }
    return (
      <div>
        <ScrollMenu
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          alignCenter={true}
          clickWhenDrag={false}
          data={Menu(datasource, selected, products)}
          dragging={true}
          hideArrows={false}
          hideSingleArrow={true}
          inertiaScrolling={false}
          // onFirstItemVisible={this.onFirstItemVisible}
          // onLastItemVisible={this.onLastItemVisible}
          // onUpdate={this.onUpdate}
          // ref={(el) => (this.menu = el)}
          rtl={false}
          scrollBy={3}
          selected={selected}
          transition={+0.4}
          translate={0}
          useButtonRole={true}
          wheel={false}
          disableTabindex={true}
          scrollToSelected={true}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

export default HorizontalMenu;

const Arrow = ({ type, className }) => {
  return (
    <div className={className}>
      <IconFont type={type} />
    </div>
  );
};
export const ArrowLeft = Arrow({
  type: "icon-Arrowleftback",
  className: styles.arrow_prev,
});
export const ArrowRight = Arrow({
  type: "icon-Arrowrightnext",
  className: styles.arrow_next,
});

const MenuItem = ({ text, isSelected }) => {
  return (
    <div className={styles[`menu_item${isSelected ? "_active" : ""}`]}>
      {text}
    </div>
  );
};

export const Menu = (list, selected, products) =>
  list
    .filter((el) => {
      return (
        products
          .filter(
            (prod) =>
              !Array.isArray(prod.usedAt) ||
              prod.usedAt.length === 0 ||
              prod.usedAt.includes("afhalen/bezorgen")
          )
          .findIndex((item) => item.categorie.includes(el.cat_code)) > -1
      );
    })
    .map((el) => {
      const { cat_name, cat_code } = el;
      const onClick = () => console.log("original onClick ", cat_name);
      const link = gegevens.homePage
        ? `/online_bestellen#${cat_code}`
        : `/#${cat_code}`;
      return (
        <Link to={link} key={cat_code}>
          <MenuItem
            text={cat_name}
            key={cat_code}
            isSelected={selected === cat_code}
            onClick={onClick}
          />
        </Link>
      );
    });
