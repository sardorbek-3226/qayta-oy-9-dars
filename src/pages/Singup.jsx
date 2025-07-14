import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const displayName = formData.get("displayName");

    const newUser = {
      email,
      password,
      displayName,
      photoURL: `https://picsum.photos/200/300?random=${Date.now()}`,
    };

    dispatch({ type: "REGISTER", payload: newUser });
    navigate("/login");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label>Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label>Display Name</label>
            <input
              name="displayName"
              type="text"
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label>Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md"
          >
            Ro'yxatdan o'tish
          </button>
        </form>
      </div>
    </section>
  );
}

export default Signup;
