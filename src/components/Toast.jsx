import { useCart } from "../context/CartContext";
import "./Toast.css";

function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) {
    return null;
  }

  return <div className="global-toast">{toastMessage}</div>;
}

export default Toast;
