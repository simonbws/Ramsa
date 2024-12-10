import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import UserContext from "./contexts/UserContext";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import { addToCartAPI, getCartAPI } from "./services/cartServices";
import "react-toastify/dist/ReactToastify.css";
setAuthToken(getJwt);

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    updatedCart.findIndex((item) => item.product._id === product._id);

    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product Added!");
      })
      .catch((err) => {
        toast.error("Failed to add product!");
        setCart(cart);
      });
  };
  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.errr("Something went wrong!");
      });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);
  return (
    <UserContext.Provider value={user}>
      <div className="app">
        <Navbar cartCount={cart.length} />
        <main>
          <ToastContainer position="bottom-right" />
          <Routing addToCart={addToCart} cart={cart} />
        </main>
      </div>
    </UserContext.Provider>
  );
};

export default App;
