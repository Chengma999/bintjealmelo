export default {
  restaurant_id: "639b8cfa5cbeec6d4b933308",
  port_client_test: 8004,
  port_express: 6050,
  transactiekosten: 0.29,
  homePage: true,
  afhaallijstPage: true,
  impressiePage: true,
  vestigingenPage: false,
  video: false,
  opmerking_place_holder: "bijv. bel defect",
  language: "nl",
  ouheng_url:
    process.env.NODE_ENV === "production"
      ? "https://www.ouheng.nl"
      : "http://localhost:5060",
  external_orderlink: undefined,
};
export const changeFormat = (p) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(
    p
  );
