import { hideAlert, showAlert } from "../redux/alert/alertActions";
import store from "../redux/store";

class Alert {
  constructor() {}
  static open({ type, title, message }) {
    store.dispatch(showAlert({ type, title, message }));
  }
  static close() {
    store.dispatch(hideAlert());
  }
}

export default Alert;
