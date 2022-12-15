// import 'babel-polyfill'
import dva from "dva";
import "./index.css";
import smoothscroll from "smoothscroll-polyfill";
import "./translations/i18n";
// import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory as createHistory } from "history";
import createLoading from "dva-loading";

smoothscroll.polyfill();
const browserHistory = createHistory({
  basename: "/",
});
browserHistory.listen((location) => {
  const { hash } = location;
  if (hash !== "") {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const yCoordinate =
          element.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -98;

        // element.scrollIntoView({ behavior: "smooth" });
        window.scroll({ top: yCoordinate + yOffset, behavior: "smooth" });
      }
    }, 200);
  }
});

// 1. Initialize
const app = dva({
  initialState: {},
  history: browserHistory,
});
// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require("./models/products").default);
app.model(require("./models/categories").default);
app.model(require("./models/cart").default);
app.model(require("./models/basket").default);
app.model(require("./models/redirect").default);
app.model(require("./models/login").default);
app.model(require("./models/admincrud").default);
app.model(require("./models/bezorgkosten").default);
app.model(require("./models/bezorgstatus").default);
app.model(require("./models/checkbox").default);
app.model(require("./models/factors").default);
app.model(require("./models/overige").default);
app.model(require("./models/basis").default);
app.model(require("./models/basicinfo").default);
app.model(require("./models/customers").default);
app.model(require("./models/options").default);
// app.model(require('./models/user').default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
