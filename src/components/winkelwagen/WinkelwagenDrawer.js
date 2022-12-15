import React, { Component } from "react";
import { Drawer } from "antd";
import styles from "../../css/winkelwagen.less";
import WinkelwagenPage from "./WinkelwagenPage";
import Basket from "../checkout/Basket";
import { changeFormat } from "Utilities/gegevens";

class WinkelwagenDrawer extends Component {
  state = {
    visible: false,
    placement: "bottom",
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  static propTypes = {};
  render() {
    const {
      type,
      basket,
      levering,
      loading,
      cart,
      products,
      itemAdd,
      itemDelete,
      goCheckout,
      location,
      bezorgkosten,
      min_value,
      factors,
      bezorgstatus,
      fee,
      radioValue,
      categories,
      transactiekosten,
      discountTakeAway,
      themeColor,
      restaurantType,
      t,
    } = this.props;
    const { totalPrice } = cart;
    return (
      <div>
        <span className={styles.drawerRow} onClick={this.showDrawer}>
          {t("Bekijk bestelling")}
          <span id="winkelwagendrawertotal">
            {type !== "Basket"
              ? cart.length === 0
                ? changeFormat(0)
                : changeFormat(totalPrice)
              : changeFormat(basket.checkoutPrice)}
          </span>
        </span>
        <Drawer
          title={
            t("Bekijk bestelling") +
            " " +
            (type !== "Basket"
              ? cart.length === 0
                ? changeFormat(0)
                : changeFormat(totalPrice)
              : changeFormat(basket.checkoutPrice))
          }
          className={styles.drawerContent}
          placement={this.state.placement}
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          height={window.innerHeight}
        >
          {type !== "Basket" ? (
            <WinkelwagenPage
              cart={cart}
              products={products}
              categories={categories}
              itemAdd={itemAdd}
              itemDelete={itemDelete}
              goCheckout={goCheckout}
              location={location}
              min_value={min_value}
              bezorgstatus={bezorgstatus}
              themeColor={themeColor}
              restaurantType={restaurantType}
              t={t}
            />
          ) : (
            <Basket
              basket={basket}
              levering={levering}
              loading={loading}
              bezorgkosten={bezorgkosten}
              min_value={min_value}
              factors={factors}
              fee={fee}
              radioValue={radioValue}
              transactiekosten={transactiekosten}
              discountTakeAway={discountTakeAway}
              t={t}
            />
          )}
        </Drawer>
      </div>
    );
  }
}

export default WinkelwagenDrawer;
