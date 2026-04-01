import { createContext, useContext, useMemo, useRef, useState } from "react";

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef(null);

  const showToast = (message) => {
    setToastMessage(message);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage("");
    }, 1800);
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((cartItem) => cartItem.id === item.id);

      if (existing) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantityInCart: cartItem.quantityInCart + 1 }
            : cartItem,
        );
      }

      return [...prevItems, { ...item, quantityInCart: 1 }];
    });

    showToast("Item added to cart 🥳");
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantityInCart: quantity } : item,
        ),
      );
    }
  };

  const totalItems = useMemo(() => cartItems.length, [cartItems]);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * item.quantityInCart,
        0,
      ),
    [cartItems],
  );

  const value = {
    cartItems,
    totalItems,
    subtotal,
    toastMessage,
    addToCart,
    removeFromCart,
    updateQuantity,
    showToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

export { CartProvider, useCart };
