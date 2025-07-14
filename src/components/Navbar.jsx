import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/useGlobalContext";

function Navbar() {
  const { totalAmount, cart, dispatch, user } = useGlobalContext();

  return (
    <header>
      <div className="container">
        <h2>
          <Link to="/">ContextStore</Link>
        </h2>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {user && <div className="flex items-center gap-2 shirk">
            <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full"/>
            <p className="shrink-0">{user.displayName}</p>
            </div>}
          <button
            onClick={()=>dispatch({type : "LOGOUT"})}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Chiqish
          </button>

          <div className="header__card">
            <span className="header__card__indicator">{totalAmount}</span>
            <FaShoppingCart />
            <div className="hidden-card">
              {cart.length > 0 ? (
                cart.map((item) => {
                  const { id, title, price, amount, image } = item;
                  return (
                    <div key={id} className="hidden-card__item">
                      <img
                        src={image}
                        alt={title}
                        width={30}
                        className="hidden-card__item-img"
                      />
                      <div className="hidden-card__item-info">
                        <h4 className="hidden-card__title">{title}</h4>
                        <h3 className="hidden-card__price">Price: ${price}</h3>
                        <p className="hidden-card__price ">
                          {amount}x ${price * amount}
                        </p>
                      </div>
                      <button
                        className="btn hidden-card__remove-btn"
                        onClick={() =>
                          dispatch({ type: "DELETE", payload: id })
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="hidden__card__info">Cart is empty</p>
              )}
              {cart.length > 0 && (
                <div className="hidden-card__card-footer">

                  <button
                    onClick={() => dispatch({ type: "CLEAR" })}
                    className="hidden-card__clear-btn"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
