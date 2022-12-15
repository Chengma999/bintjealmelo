import { createAction } from "redux-actions";

//cart
export const itemAdd = createAction("cart/add");
export const itemDelete = createAction("cart/delete");

export const goCheckout = createAction("cart/ready_to_pay");
export const logIn = createAction("login/login");
export const cancelProductModal = createAction("products/cancel");
export const fetchProducts = createAction("products/fetch");
export const updateInDb = createAction("products/updateProduct");
export const bulkUpdateProducts = createAction("products/bulkUpdateProducts");
export const addInDb = createAction("products/addProduct");
export const deleteInDb = createAction("products/deleteProduct");
export const fetchBasketOrder = createAction("basket/fetch");
export const updateCheckoutPrice = createAction("basket/updateCheckoutPrice");
export const ordersFetch = createAction("admincrud/ordersFetch");
export const printOrder = createAction("admincrud/printOrder");
export const smsSend = createAction("admincrud/sms_send");
export const sendMail = createAction("admincrud/sendMail");
export const getOptions = createAction("admincrud/getOptions");
export const updateOptions = createAction("admincrud/updateOptions");
export const chooseBezorgGebied = createAction("basicinfo/bezorggebied/choose");
export const fetchBezorggebied = createAction("factors/fetchbezorggebied");
export const fetchCategories = createAction("categories/fetch");
export const addCategorie = createAction("categories/addCategorie");
export const addMainCategorie = createAction("categories/addMainCategorie");
export const updateCategorie = createAction("categories/updateCategorie");
export const updateMainCategorie = createAction(
  "categories/updateMainCategorie"
);
export const deleteCategorie = createAction("categories/deleteCategorie");
export const deleteMainCategorie = createAction(
  "categories/deleteMainCategorie"
);
export const fetchBasicinfo = createAction("categories/fetch");
export const updateCheckbox = createAction("checkbox/updateCheckbox");
export const selectTip = createAction("basket/selectTip");
export const addGroup = createAction("options/addGroup");
export const updateGroup = createAction("options/updateGroup");
export const deleteGroup = createAction("options/deleteGroup");
export const copyGroup = createAction("options/copyGroup");
export const updateGroupOption = createAction("options/updateGroupOption");
export const addGroupOption = createAction("options/addGroupOption");
export const deleteGroupOption = createAction("options/deleteGroupOption");
export const updateKvknr = createAction("overige/updateKvknr");
export const updateJobOffer = createAction("overige/updateJobOffer");
export const updateBuffetText = createAction("overige/updateBuffetText");
export const updateResAddress = createAction("overige/updateResAddress");
export const updateResPostcode = createAction("overige/updateResPostcode");
export const updateResMail = createAction("overige/updateResMail");
export const updateResTelnr = createAction("overige/updateResTelnr");
export const updateTransactieKosten = createAction(
  "overige/updateTransactieKosten"
);
export const updatePlasticTas = createAction("overige/updatePlasticTas");
export const updateShowtip = createAction("overige/updateShowtip");
export const updateOrderInAdvance = createAction(
  "overige/updateOrderInAdvance"
);
export const updateStampcard = createAction("overige/updateStampcard");
export const updateLiveKey = createAction("overige/updateLiveKey");
export const updateFacebookUrl = createAction("overige/updateFacebookUrl");
export const updateEmailLogoUrl = createAction("overige/updateEmailLogoUrl");
export const updateText_1 = createAction("overige/updateText_1");
export const updateText_2 = createAction("overige/updateText_2");
export const updateBezorgstatus = createAction("overige/updateBezorgstatus");
export const updatePaybycash = createAction("overige/updatePaybycash");
export const updatePayMethod = createAction("overige/updatePayMethod");
export const updateDiscountTakeAway = createAction(
  "overige/updateDiscountTakeAway"
);
export const addBezorggebied = createAction("overige/addBezorggebied");
export const updateBezorggebied = createAction("overige/updateBezorggebied");
export const addDiscountcode = createAction("overige/addDiscountcode");
export const deleteDiscountcode = createAction("overige/deleteDiscountcode");
export const updateDiscountcode = createAction("overige/updateDiscountcode");
export const enterDiscountcode = createAction("overige/enterDiscountcode");

export const deleteBezorggebied = createAction("overige/deleteBezorggebied");
export const addOpeningstijden = createAction("overige/addOpeningstijden");
export const updateOpeningstijden = createAction(
  "overige/updateOpeningstijden"
);
export const deleteOpeningstijden = createAction(
  "overige/deleteOpeningstijden"
);
export const addDeliverytijden = createAction("overige/addDeliverytijden");
export const updateDeliverytijden = createAction(
  "overige/updateDeliverytijden"
);
export const deleteDeliverytijden = createAction(
  "overige/deleteDeliverytijden"
);
export const updateBezorgtijden = createAction("overige/updateBezorgtijden");
export const updateZsm = createAction("overige/updateZsm");
export const updateTimeInterval = createAction("overige/updateTimeInterval");
export const updateWaitingTimeFirstOrder = createAction(
  "overige/updateWaitingTimeFirstOrder"
);
export const updateLimitedNumberOfOrders = createAction(
  "overige/updateLimitedNumberOfOrders"
);
export const addCloseDay = createAction("overige/addCloseDay");
export const updateCloseDay = createAction("overige/updateCloseDay");
export const deleteCloseDay = createAction("overige/deleteCloseDay");
export const updateCloseday = createAction("overige/updateCloseday");
export const updatePrintMethod = createAction("overige/updatePrintMethod");
export const deletePrintMethod = createAction("overige/deletePrintMethod");
export const listenOrder = createAction("admincrud/listenOrder");
export const updateBackgroundImages = createAction(
  "overige/updateBackgroundImages"
);
export const addCarouselImage = createAction("overige/addCarouselImage");
export const updateCarouselImage = createAction("overige/updateCarouselImage");
export const deleteCarouselImage = createAction("overige/deleteCarouselImage");
export const addBuffetImage = createAction("overige/addBuffetImage");
export const updateBuffetImage = createAction("overige/updateBuffetImage");
export const deleteBuffetImage = createAction("overige/deleteBuffetImage");
export const addMenulijst = createAction("overige/addMenulijst");
export const updateMenulijst = createAction("overige/updateMenulijst");
export const deleteMenulijst = createAction("overige/deleteMenulijst");
export const updatePassword = createAction("overige/updatePassword");
export const clearPasswordResult = createAction(
  "basicinfo/password/clearPasswordResult"
);
export const updateReservation = createAction("overige/updateReservation");
export const updateConcept = createAction("overige/updateConcept");
export const updateRestaurantPage = createAction(
  "overige/updateRestaurantPage"
);

export const updateThemeColor = createAction("basis/updateThemeColor");
export const fetchBasicInfo = createAction("basicinfo/fetch");
export const calTotalPrice = createAction("basket/calTotalPrice");
