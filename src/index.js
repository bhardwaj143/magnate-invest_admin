import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "bootstrap-social/bootstrap-social.css";
import "react-toastify/dist/ReactToastify.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import App from "./App/index";
import * as serviceWorker from "./serviceWorker";
import reducer from "./store/reducer";
import config from "./config";
import "./index.css";
import Login from "./redux/reducers/loginReducer";
import Users from "./redux/reducers/userDataReducer";

const reducers = combineReducers({
  reducer: reducer,
  login: Login,
  users: Users,
});

const store = createStore(reducers, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <NotificationContainer />
    <BrowserRouter basename={config.basename}>
      {/* basename="/datta-able" */}
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
