import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Affix, BackTop } from "antd";
import styles from "../../css/layout.less";
import Bezorgingsinfo from "./Bezorgingsinfo";
import Explorer from "../explorer";
import { useTranslation } from "react-i18next";
import ExplorerSelector from "../explorer/ExplorerSelector";
import ProductContainer from "../products/ProductContainer";
import WinkelwagenPage from "../winkelwagen/WinkelwagenPage";
import WinkelwagenDrawer from "../winkelwagen/WinkelwagenDrawer";
import LayoutWrapper from "./LayoutWrapper";
import HorizontalMenu from "../explorer/HorizontalMenu";
import NotFound from "./NotFound";
import { IconFont } from "Utilities/toolStore";
const propTypes = {
  itemAdd: PropTypes.func,
  itemDelete: PropTypes.func,
  goCheckout: PropTypes.func.isRequired,
};

function LayoutComponent(props) {
  const { t } = useTranslation();
  const [explorerMargin, setExplorerMargin] = useState(false);
  const [winkelwagenMargin, setWinkelwagenMargin] = useState(false);
  const [horizontalMenuAffixed, setHorizontalMenuAffixed] = useState(false);
  const [showbezorginfo, setShowbezorginfo] = useState(false);

  const {
    categories,
    products,
    loading,
    cart,
    itemAdd,
    itemDelete,
    goCheckout,
    location,
    history,
    checkbox,
    factors,
    admincrud,
    basicinfo,
  } = props;
  const {
    bezorggebied,
    bezorgstatus,
    bezorgchosen,
    transactieKosten,
    discountTakeAway,
    onlinebestellen,
  } = basicinfo;
  let min_value =
    bezorggebied && bezorgchosen
      ? bezorggebied.find((item) => item.postcode === bezorgchosen).min_value
      : bezorggebied.length > 0 && !bezorgchosen
      ? Math.min.apply(
          null,
          bezorggebied.map(function (e) {
            return e.min_value;
          })
        )
      : 0;
  const handleClick = (e) => {
    if (!showbezorginfo) {
      setShowbezorginfo(true);
      return;
    }
    setShowbezorginfo(false);
  };
  return (
    <LayoutWrapper {...props}>
      {!onlinebestellen ? (
        <NotFound />
      ) : (
        <div>
          <Affix
            offsetTop={0}
            onChange={(affixed) => {
              setHorizontalMenuAffixed(affixed);
            }}
          >
            <div
              className={
                !horizontalMenuAffixed
                  ? styles.horizontalMenu
                  : styles.horizontalMenuWhenScroll
              }
            >
              <HorizontalMenu categories={categories} products={products} />
            </div>
          </Affix>
          <div className={styles.fullSpecials}>
            <div style={{ display: "flex" }}>
              {Array.isArray(bezorggebied) && bezorggebied.length > 0 ? (
                <OutsideInfotable setShowbezorginfo={setShowbezorginfo}>
                  <div className={styles.infoIcon} onClick={handleClick}>
                    <Affix offsetTop={0}>
                      <IconFont type="icon-infomation-fill" />
                    </Affix>
                    <div className={styles.bezorginsinfoAffix}>
                      <Affix>
                        {showbezorginfo ? (
                          <div>
                            <Bezorgingsinfo bezorggebied={bezorggebied} />
                          </div>
                        ) : null}
                      </Affix>
                    </div>
                  </div>
                </OutsideInfotable>
              ) : null}
              <Affix
                offsetTop={0}
                style={{
                  width: "80%",
                  marginLeft: "10%",
                }}
              >
                <div className={styles.explorerSelector}>
                  <ExplorerSelector
                    categories={categories}
                    history={history}
                    products={products}
                  />
                </div>
              </Affix>
            </div>
            <Affix
              offsetTop={20}
              onChange={(affixed) => {
                if (affixed) {
                  setExplorerMargin(true);
                }
                if (!affixed) {
                  setExplorerMargin(false);
                }
              }}
            ></Affix>
            <div
              className={
                !horizontalMenuAffixed
                  ? styles.productpage
                  : styles.productPageWhenScroll
              }
            >
              <ProductContainer
                categories={categories}
                products={products}
                loading={loading}
                itemAdd={itemAdd}
                checkbox={checkbox}
                factors={factors}
                options={basicinfo.options}
                basicinfo={basicinfo}
                history={history}
                t={t}
              />
            </div>
            <Affix
              offsetTop={110}
              onChange={(affixed) => {
                if (affixed) {
                  setWinkelwagenMargin(true);
                }
                if (!affixed) {
                  setWinkelwagenMargin(false);
                }
              }}
            >
              <div
                className={
                  winkelwagenMargin
                    ? styles.winkelwagenWhenScroll
                    : styles.winkelwagen
                }
              >
                <WinkelwagenPage
                  cart={cart}
                  products={products}
                  categories={categories}
                  itemAdd={itemAdd}
                  itemDelete={itemDelete}
                  goCheckout={goCheckout}
                  min_value={min_value}
                  location={location}
                  bezorgstatus={bezorgstatus}
                  admincrud={admincrud}
                  themeColor={basicinfo.themeColor}
                  restaurantType={basicinfo.restaurantType}
                  t={t}
                />
              </div>
            </Affix>
            <div className={styles.winkelwagenDrawer}>
              <WinkelwagenDrawer
                cart={cart}
                products={products}
                categories={categories}
                itemAdd={itemAdd}
                itemDelete={itemDelete}
                goCheckout={goCheckout}
                location={location}
                min_value={min_value}
                factors={factors}
                bezorgstatus={bezorgstatus}
                admincrud={admincrud}
                transactiekosten={transactieKosten}
                discountTakeAway={discountTakeAway}
                themeColor={basicinfo.themeColor}
                restaurantType={basicinfo.restaurantType}
                t={t}
              />
            </div>
          </div>
          <BackTop>
            <div className={`${styles.iconBackTop} ${styles.hide}`}>
              <IconFont type="icon-back-top" className={styles.iconMenu} />
            </div>
          </BackTop>
        </div>
      )}
    </LayoutWrapper>
  );
}

LayoutComponent.propTypes = propTypes;

export default LayoutComponent;

function useOutsideInfotable(ref, setShowbezorginfo) {
  useEffect(() => {
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowbezorginfo(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref]);
}

function OutsideInfotable(props) {
  const { setShowbezorginfo } = props;
  const infotable = useRef(null);
  useOutsideInfotable(infotable, setShowbezorginfo);
  return <div ref={infotable}>{props.children}</div>;
}
