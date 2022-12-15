import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Table, Tooltip } from "antd";
import AdminPage from "../AdminPage";
import BezorgstatusForm from "./BezorgstatusForm";
// import BezorgtijdenForm from "./BezorgtijdenForm";
import ZsmForm from "./ZsmForm";
import AddCloseDay from "./sluitdagen/AddCloseDay";
import CloseDayTable from "./sluitdagen/CloseDayTable";
import TimeIntervalForm from "./TimeIntervalForm";
import PaybycashForm from "./PaybycashForm";
import PayMethodForm from "./PayMethodForm";
// import ClosedayForm from "./ClosedayForm";
import AfhaaltextForm from "./AfhaaltextForm";
import PlasticTasForm from "./PlasticTasForm";
import BackgroundImagesForm from "./BackgroundImagesForm";
import BezorggebiedAddForm from "./bezorggebied/BezorggebiedAddForm";
import BezorggebiedTable from "./bezorggebied/BezorggebiedTable";
import OpeningstijdenAddForm from "./openingstijden/OpeningstijdenAddForm";
import OpeningstijdenTable from "./openingstijden/OpeningstijdenTable";
import DeliverytijdenAddForm from "./openingstijden/OpeningstijdenAddForm";
import DeliverytijdenTable from "./openingstijden/OpeningstijdenTable";
import CarouselAddForm from "./carousel/CarouselAddForm";
import CarouselTable from "./carousel/CarouselTable";
import BuffetImagesAddForm from "./buffetImages/BuffetImagesAddForm";
import BuffetImagesTable from "./buffetImages/BuffetImagesTable";
import MenulijstAddForm from "./menulijst/MenulijstAddForm";
import MenulijstTable from "./menulijst/MenulijstTable";
import DiscountcodeAddForm from "./discountcode/DiscountcodeAddForm";
import DiscountcodeTable from "./discountcode/DiscountcodeTable";
import PrintMethodForm from "./PrintMethodForm";
import ChangePasswordForm from "./ChangePasswordForm";
import ReservationForm from "./reservation/ReservationForm";
import ConceptForm from "./concept/ConceptForm";
import RestaurantForm from "./restaurant/RestaurantForm";
import styles from "../admin.less";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../common/LanguageSwitcher";
import OrderinadvanceForm from "./orderinadvance/OrderinadvanceForm";
import StampcardForm from "./stampcard/StampcardForm";
import TipForm from "./tip/TipForm.js";
import { CapitalizeFC, UppercaseFC } from "Utilities/toolStore";
import {
  updateKvknr,
  updateJobOffer,
  updateBuffetText,
  updateLiveKey,
  updateFacebookUrl,
  updateEmailLogoUrl,
  updateText_1,
  updateText_2,
  updateBezorgstatus,
  updatePaybycash,
  updatePayMethod,
  updateDiscountTakeAway,
  addBezorggebied,
  addDiscountcode,
  deleteDiscountcode,
  updateDiscountcode,
  updateBezorggebied,
  deleteBezorggebied,
  addOpeningstijden,
  updateOpeningstijden,
  deleteOpeningstijden,
  updateBezorgtijden,
  addDeliverytijden,
  updateDeliverytijden,
  deleteDeliverytijden,
  updateZsm,
  addCloseDay,
  updateCloseDay,
  deleteCloseDay,
  updateCloseday,
  updatePrintMethod,
  deletePrintMethod,
  updateBackgroundImages,
  addCarouselImage,
  addBuffetImage,
  updateCarouselImage,
  deleteCarouselImage,
  updateBuffetImage,
  deleteBuffetImage,
  addMenulijst,
  updateMenulijst,
  deleteMenulijst,
  updateTimeInterval,
  updateWaitingTimeFirstOrder,
  updateLimitedNumberOfOrders,
  updateTransactieKosten,
  updatePlasticTas,
  updatePassword,
  clearPasswordResult,
  updateReservation,
  updateConcept,
  updateRestaurantPage,
  updateShowtip,
  updateOrderInAdvance,
  updateStampcard,
} from "../../../actions";

const columns = [
  {
    title: "",
    dataIndex: "keys",
    width: 50,
    render: (text) => <div style={{ fontWeight: "600" }}>{text}</div>,
  },
  {
    title: "",
    dataIndex: "values",
    width: 150,
  },
];

function Overige(props) {
  const { t } = useTranslation();
  const {
    basicinfo,
    updateKvknr,
    updateJobOffer,
    updateBuffetText,
    updateLiveKey,
    updateFacebookUrl,
    updateEmailLogoUrl,
    updateText_1,
    updateText_2,
    updateBezorgstatus,
    updatePaybycash,
    updatePayMethod,
    updateDiscountTakeAway,
    addBezorggebied,
    updateBezorggebied,
    deleteBezorggebied,
    addDiscountcode,
    updateDiscountcode,
    deleteDiscountcode,
    addOpeningstijden,
    updateOpeningstijden,
    deleteOpeningstijden,
    addDeliverytijden,
    updateDeliverytijden,
    deleteDeliverytijden,
    updateBezorgtijden,
    updateZsm,
    addCloseDay,
    updateCloseDay,
    deleteCloseDay,
    updateCloseday,
    updatePrintMethod,
    deletePrintMethod,
    updateBackgroundImages,
    addCarouselImage,
    addBuffetImage,
    updateCarouselImage,
    deleteCarouselImage,
    updateBuffetImage,
    deleteBuffetImage,
    addMenulijst,
    updateMenulijst,
    deleteMenulijst,
    updateTimeInterval,
    updateWaitingTimeFirstOrder,
    updateLimitedNumberOfOrders,
    updateTransactieKosten,
    updatePlasticTas,
    updateShowtip,
    updateOrderInAdvance,
    updateStampcard,
    updatePassword,
    clearPasswordResult,
    updateReservation,
    updateConcept,
    updateRestaurantPage,
  } = props;
  const initialData = [
    {
      key: "transactieKosten",
      keys: t("Transactiekosten"),
      values: (
        <AfhaaltextForm
          text={basicinfo.transactieKosten}
          updateText={updateTransactieKosten}
          name="transactieKosten"
        />
      ),
    },
    {
      key: "plastictas",
      keys: CapitalizeFC(t("plasticbag")),
      values: (
        <PlasticTasForm
          plastictas={basicinfo.plastictas}
          updatePlasticTas={updatePlasticTas}
        />
      ),
    },
    {
      key: "tip",
      keys: CapitalizeFC(t("tip")),
      values: <TipForm tip={basicinfo.showtip} updateShowtip={updateShowtip} />,
    },
    {
      key: "orderinadvance",
      keys: CapitalizeFC(t("orderinadvance")),
      values: (
        <OrderinadvanceForm
          orderinadvance={basicinfo.orderinadvance}
          updateOrderInAdvance={updateOrderInAdvance}
        />
      ),
    },
    {
      key: "stampcard",
      keys: CapitalizeFC(t("stampcard")),
      values: (
        <StampcardForm
          stampcard={basicinfo.stampcard}
          updateStampcard={updateStampcard}
        />
      ),
    },
    {
      key: "payMethod",
      keys: t("Betaalmethode"),
      values: (
        <PayMethodForm
          payMethod={basicinfo.payMethod}
          updatePayMethod={updatePayMethod}
          t={t}
        />
      ),
    },
    {
      key: "discountTakeAway",
      keys: t("discount_at_take_away"),
      values: (
        <PaybycashForm
          name="discountTakeAway"
          discountTakeAway={basicinfo.discountTakeAway}
          updateDiscountTakeAway={updateDiscountTakeAway}
          t={t}
        />
      ),
    },

    {
      key: "zsm",
      keys: (
        <span>
          {t("asap")}&nbsp;
          <Tooltip title={t("explanation_zsm")}>
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      values: <ZsmForm zsm={basicinfo.zsm} updateZsm={updateZsm} />,
    },
    {
      key: "timeinterval",
      keys: (
        <span>
          {t("time_interval")}&nbsp;
          <Tooltip title={t("explanation_time_interval")}>
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      values: (
        <TimeIntervalForm
          timeInterval={basicinfo.timeInterval}
          updateTimeInterval={updateTimeInterval}
          component="timeInterval"
        />
      ),
    },
    {
      key: "waitingTimeFirstOrder",
      keys: (
        <span>
          {t("waitingtime")}&nbsp;
          <Tooltip title={t("explanation_waiting_time")}>
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      values: (
        <TimeIntervalForm
          timeInterval={basicinfo.waitingTimeFirstOrder}
          updateTimeInterval={updateWaitingTimeFirstOrder}
          component="waitingTimeFirstOrder"
        />
      ),
    },
    {
      key: "limitedNumberOfOrders",
      keys: t("limited_amount_of_orders"),
      values: (
        <TimeIntervalForm
          timeInterval={basicinfo.limitedNumberOfOrders}
          updateTimeInterval={updateLimitedNumberOfOrders}
          component="limitedNumberOfOrders"
        />
      ),
    },
    // {
    //   key: "gesloten dagen",
    //   keys: t("closing_days"),
    //   values: (
    //     <ClosedayForm
    //       closeday={basicinfo.closeday}
    //       updateCloseday={updateCloseday}
    //     />
    //   ),
    // },
    {
      key: "text_1",
      keys: t("text1"),
      values: (
        <AfhaaltextForm text={basicinfo.text_1} updateText={updateText_1} />
      ),
    },
    {
      key: "text_2",
      keys: t("text2"),
      values: (
        <AfhaaltextForm text={basicinfo.text_2} updateText={updateText_2} />
      ),
    },
    {
      key: "background_imgs",
      keys: t("background_images"),
      values: (
        <BackgroundImagesForm
          backgroundImages={basicinfo.backgroundImages}
          updateBackgroundImages={updateBackgroundImages}
        />
      ),
    },
    {
      key: "kvknr",
      keys: `${t("company_number")}`,
      values: (
        <AfhaaltextForm text={basicinfo.kvknr} updateText={updateKvknr} />
      ),
    },
    {
      key: "liveKey",
      keys: "Mollie Live Key",
      values: (
        <AfhaaltextForm text={basicinfo.liveKey} updateText={updateLiveKey} />
      ),
    },
    {
      key: "facebookUrl",
      keys: "Facebook Url",
      values: (
        <AfhaaltextForm
          text={basicinfo.facebookUrl}
          updateText={updateFacebookUrl}
        />
      ),
    },
    {
      key: "emailLogoUrl",
      keys: "Email Logo Url",
      values: (
        <AfhaaltextForm
          text={basicinfo.emailLogoUrl}
          updateText={updateEmailLogoUrl}
        />
      ),
    },
    {
      key: "printMethod",
      keys: "Print Mode",
      values: (
        <PrintMethodForm
          printMethod={basicinfo.printMethod}
          updatePrintMethod={updatePrintMethod}
          deletePrintMethod={deletePrintMethod}
        />
      ),
    },
    {
      key: "changepassword",
      keys: t("change_password"),
      values: (
        <ChangePasswordForm
          updatePassword={updatePassword}
          password={basicinfo.password}
          clearPasswordResult={clearPasswordResult}
          t={t}
        />
      ),
    },
  ];
  const jobOfferTextform = {
    key: "jobOffer",
    keys: t("work_with_us"),
    values: (
      <AfhaaltextForm
        text={basicinfo.jobOffer.text}
        updateText={updateJobOffer}
      />
    ),
  };
  const buffetTextform = {
    key: "buffetText",
    keys: CapitalizeFC(t("buffet_text")),
    values: (
      <AfhaaltextForm
        text={basicinfo.buffet.text}
        updateText={updateBuffetText}
      />
    ),
  };
  const reservationform = {
    key: "reservationForm",
    keys: t("reservation_settings"),
    values: (
      <ReservationForm
        reservation={basicinfo.reservation}
        updateReservation={updateReservation}
      />
    ),
  };
  const conceptform = {
    key: "conceptForm",
    keys: "Conceptpaginasinstellingen",
    values: (
      <ConceptForm concept={basicinfo.concept} updateConcept={updateConcept} />
    ),
  };
  const restaurantform = {
    key: "restaurantForm",
    keys: "Restaurantpaginasinstellingen",
    values: (
      <RestaurantForm
        restaurant={basicinfo.restaurant}
        updateRestaurantPage={updateRestaurantPage}
      />
    ),
  };
  let data = [...initialData];
  if (basicinfo.jobOffer.isEnabled) {
    data.push(jobOfferTextform);
  }
  if (basicinfo.buffet.isEnabled) {
    data.push(buffetTextform);
  }
  if (basicinfo.reservation.isEnabled) {
    data.push(reservationform);
  }
  if (basicinfo.concept.isEnabled) {
    data.push(conceptform);
  }
  if (basicinfo.restaurant.isEnabled) {
    data.push(restaurantform);
  }
  return (
    <div>
      <AdminPage page="overige" reservation={basicinfo.reservation} t={t} />
      <div id="barsMenuAndLanguageSwitcherWrapper">
        <div id="languageSwitcherWrapper">
          <LanguageSwitcher />
        </div>
      </div>
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      </div>
      <BezorggebiedAddForm
        bezorggebied={basicinfo.bezorggebied}
        addBezorggebied={addBezorggebied}
        t={t}
      />
      <BezorggebiedTable
        bezorggebied={basicinfo.bezorggebied}
        updateBezorggebied={updateBezorggebied}
        deleteBezorggebied={deleteBezorggebied}
        t={t}
      />
      <DiscountcodeAddForm
        addDiscountcode={addDiscountcode}
        t={t}
        CapitalizeFC={CapitalizeFC}
      />
      <DiscountcodeTable
        discountcode={basicinfo.discountcode}
        deleteDiscountcode={deleteDiscountcode}
        updateDiscountcode={updateDiscountcode}
        t={t}
      />
      <OpeningstijdenAddForm
        openingstijden={basicinfo.openingstijden}
        addOpeningstijden={addOpeningstijden}
        t={t}
        CapitalizeFC={CapitalizeFC}
      />
      <OpeningstijdenTable
        openingstijden={basicinfo.openingstijden}
        updateOpeningstijden={updateOpeningstijden}
        deleteOpeningstijden={deleteOpeningstijden}
        t={t}
        CapitalizeFC={CapitalizeFC}
      />
      <AddCloseDay
        addCloseDay={addCloseDay}
        t={t}
        CapitalizeFC={CapitalizeFC}
      />
      <CloseDayTable
        updateCloseDay={updateCloseDay}
        deleteCloseDay={deleteCloseDay}
        _closeday={basicinfo._closeday}
        t={t}
      />
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={[
            {
              key: "bezorgstatus",
              keys: CapitalizeFC(t("delivery")),
              values: (
                <BezorgstatusForm
                  bezorgstatus={basicinfo.bezorgstatus}
                  updateBezorgstatus={updateBezorgstatus}
                  t={t}
                  UppercaseFC={UppercaseFC}
                />
              ),
            },
          ]}
          pagination={false}
          bordered
        />
      </div>
      <DeliverytijdenAddForm
        isDeliverytijden={true}
        openingstijden={basicinfo.deliverytijden}
        addOpeningstijden={addDeliverytijden}
        CapitalizeFC={CapitalizeFC}
        t={t}
      />
      <DeliverytijdenTable
        openingstijden={basicinfo.deliverytijden}
        updateOpeningstijden={updateDeliverytijden}
        deleteOpeningstijden={deleteDeliverytijden}
        CapitalizeFC={CapitalizeFC}
        t={t}
      />

      <CarouselAddForm
        carouselImages={basicinfo.carouselImages}
        addCarouselImage={addCarouselImage}
        t={t}
      />
      <CarouselTable
        carouselImages={basicinfo.carouselImages}
        updateCarouselImage={updateCarouselImage}
        deleteCarouselImage={deleteCarouselImage}
        t={t}
      />
      <MenulijstAddForm
        menulijsts={basicinfo.menulijsts}
        addMenulijst={addMenulijst}
        t={t}
        CapitalizeFC={CapitalizeFC}
      />
      <MenulijstTable
        menulijsts={basicinfo.menulijsts}
        updateMenulijst={updateMenulijst}
        deleteMenulijst={deleteMenulijst}
        t={t}
        CapitalizeFC={CapitalizeFC}
      />
      {!basicinfo.buffet.isEnabled ? null : (
        <div>
          <BuffetImagesAddForm
            buffetImages={basicinfo.buffet.images}
            addBuffetImage={addBuffetImage}
          />

          <BuffetImagesTable
            buffetImages={basicinfo.buffet.images}
            updateBuffetImage={updateBuffetImage}
            deleteBuffetImage={deleteBuffetImage}
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({
  basicinfo,
  bezorgkosten,
  bezorgstatus,
  factors,
  overige,
}) => ({
  basicinfo,
  bezorgkosten,
  bezorgstatus,
  factors,
  overige,
});

export default connect(mapStateToProps, {
  updateKvknr,
  updateJobOffer,
  updateBuffetText,
  updateLiveKey,
  updateFacebookUrl,
  updateEmailLogoUrl,
  updateText_1,
  updateText_2,
  updateBezorgstatus,
  updatePaybycash,
  updatePayMethod,
  updateDiscountTakeAway,
  addBezorggebied,
  addDiscountcode,
  deleteDiscountcode,
  updateDiscountcode,
  updateBezorggebied,
  deleteBezorggebied,
  addOpeningstijden,
  updateOpeningstijden,
  deleteOpeningstijden,
  addDeliverytijden,
  updateDeliverytijden,
  deleteDeliverytijden,
  updateBezorgtijden,
  updateZsm,
  addCloseDay,
  updateCloseDay,
  deleteCloseDay,
  updateCloseday,
  updatePrintMethod,
  deletePrintMethod,
  updateBackgroundImages,
  addCarouselImage,
  addBuffetImage,
  updateCarouselImage,
  deleteCarouselImage,
  updateBuffetImage,
  deleteBuffetImage,
  addMenulijst,
  updateMenulijst,
  deleteMenulijst,
  updateTimeInterval,
  updateWaitingTimeFirstOrder,
  updateLimitedNumberOfOrders,
  updateTransactieKosten,
  updatePlasticTas,
  updateShowtip,
  updateOrderInAdvance,
  updateStampcard,
  updatePassword,
  clearPasswordResult,
  updateReservation,
  updateConcept,
  updateRestaurantPage,
})(Overige);
