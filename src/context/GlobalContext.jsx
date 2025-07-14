import { createContext, useEffect, useReducer } from "react";

export const GlobalContext = createContext();

const initialState = {
  cart: [],
  totalPrice: 0,
  totalAmount: 0,
  user: null,
  userData: [
    {
      displayName: "Sardor",
      email: "ibrohimovs791@gmail.com",
      password: "12345678",
      photoURL: "https://picsum.photos/200/300?random=1",
    },
  ],
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "REGISTER":
      return {
        ...state,
        userData: [...state.userData, payload],
      };

    case "LOGIN":
      return {
        ...state,
        user: payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, payload] };

    case "DELETE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload),
      };

    case "INCREASE":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload ? { ...item, amount: item.amount + 1 } : item
        ),
      };

    case "DECREASE":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload ? { ...item, amount: item.amount - 1 } : item
        ),
      };

    case "CLEAR":
      return {
        ...state,
        cart: [],
        totalPrice: 0,
        totalAmount: 0,
      };

    case "CALCULATE_TOTAL":
      let { totalAmount, totalPrice } = state.cart.reduce(
        (acc, curVal) => {
          const { amount, price } = curVal;
          acc.totalAmount += amount;
          acc.totalPrice += amount * price;
          return acc;
        },
        {
          totalPrice: 0,
          totalAmount: 0,
        }
      );
      return {
        ...state,
        totalAmount,
        totalPrice,
      };

    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTAL" });
  }, [state.cart]);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
