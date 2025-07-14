import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { userData, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const foundUser = userData.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      dispatch({ type: "LOGIN", payload: foundUser });
      navigate("/");
    } else {
      alert("Email yoki parol noto‘g‘ri");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Login</h1>
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
            <label>Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="pt-4 flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md"
            >
              Kirish
            </button>
            <Link to="/signup" className="text-blue-600 hover:underline">
              Ro'yxatdan o‘tish
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
