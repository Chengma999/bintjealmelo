import React from "react";
import { Router, Redirect, Route, Switch } from "dva/router";
import HomePage from "./routes/HomePage";
import LayoutPage from "./routes/LayoutPage";
import Checkout from "./routes/Checkout";
import RedirectPage from "./routes/Redirect";
import Privacy from "./routes/Privacy";
import Algemenevoorwaarden from "./routes/Algemenevoorwaarden";
import Contact from "./routes/Contact";
import Stampcard from "./routes/Stampcard";
import Impressie from "./routes/Impressie";
import Vestigingen from "./routes/Vestigingen";
import Menulijst from "./routes/Menulijst";
import Afhaallijst from "./routes/Afhaallijst";
import Restaurant from "./routes/Restaurant";
import JobOffer from "./routes/JobOffer";
import Buffet from "./routes/Buffet";
import Concept from "./routes/Concept";
import Reserveren from "./routes/Reserveren";
import Login from "./routes/Login";
import Admin from "./routes/Admin";
import requireAuth from "./utils/requireAuth";
import AdminProducts from "./components/admin/productscrud/AdminProducts.js";
import AdminOrders from "./components/admin/order/Order.js";
import Overige from "./components/admin/overige/overige.js";
import Basis from "./components/admin/basis/Basis.js";
import CustomersList from "./components/admin/customers/CustomersList.js";
import gegevens from "Utilities/gegevens";
import ScrollToTop from "Utilities/ScrollToTop";

function RouterConfig(props) {
  console.log(props);
  const homePage = gegevens.homePage ? (
    <Route path="/" exact component={HomePage} />
  ) : (
    <Route path="/" exact component={LayoutPage} />
  );
  const onlinebestelPage = (
    <Route path="/online_bestellen" exact component={LayoutPage} />
  );
  const afhaallijstPage = gegevens.homePage ? null : (
    <Route path="/afhaallijst" exact component={Afhaallijst} />
  );
  const contactPage = gegevens.homePage ? null : (
    <Route path="/contact" exact component={Contact} />
  );
  const stampcardRulesPage = gegevens.homePage ? null : (
    <Route path="/stampcard" exact component={Stampcard} />
  );
  const restaurantPage = (
    <Route path="/restaurant" exact component={Restaurant} />
  );

  const jobOfferPage = (
    <Route path="/werkenbijons" exact component={JobOffer} />
  );
  const reservationPage = (
    <Route path="/reserveren" exact component={Reserveren} />
  );
  const buffetPage = <Route path="/buffet" exact component={Buffet} />;
  const cateringPage = <Route path="/catering" exact component={Buffet} />;
  const conceptPage = <Route path="/concept" exact component={Concept} />;
  const impressiePage =
    gegevens.impressiePage && !gegevens.homePage ? (
      <Route path="/impressie" exact component={Impressie} />
    ) : null;
  const vestigingenPage =
    gegevens.impressiePage && !gegevens.homePage ? (
      <Route path="/vestigingen" exact component={Vestigingen} />
    ) : null;
  const menulijstPage = <Route path="/menulijst" exact component={Menulijst} />;

  return (
    <Router
      history={props.history}
      // onUpdate={hashLinkScroll}
    >
      <div>
        <ScrollToTop />
        <Switch>
          {homePage}
          {onlinebestelPage}
          {reservationPage}
          {afhaallijstPage}
          {contactPage}
          {stampcardRulesPage}
          {restaurantPage}
          {impressiePage}
          {conceptPage}
          {vestigingenPage}
          {menulijstPage}
          {jobOfferPage}
          {buffetPage}
          {cateringPage}
          <Route path="/checkout/:id" exact component={Checkout} />
          <Route path="/redirect" exact component={RedirectPage} />
          <Route path="/privacy" exact component={Privacy} />
          <Route
            path="/algemenevoorwaarden"
            exact
            component={Algemenevoorwaarden}
          />
          <Route path="/login" exact component={Login} />
          <Route path="/admin" exact component={requireAuth(Admin)} />
          <Route
            path="/admin/products"
            exact
            component={requireAuth(AdminProducts)}
          />
          <Route
            path="/admin/orders"
            exact
            component={requireAuth(AdminOrders)}
          />
          <Route path="/admin/basis" exact component={requireAuth(Basis)} />
          <Route path="/admin/overige" exact component={requireAuth(Overige)} />
          <Route
            path="/admin/customers"
            exact
            component={requireAuth(CustomersList)}
          />
          <Redirect to="/"></Redirect>
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
