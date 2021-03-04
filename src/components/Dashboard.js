import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Dashboard = () => {
  const history = useHistory();
  const user = jwt_decode(localStorage.getItem("token"));
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }

    return () => {
      localStorage.removeItem("token");
      history.push("/");
      history.go(0);
    };
  }, [history]);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
    history.go(0);
  };

  return (
    <div className="text-black dark:text-white">
      Welcome {user.user.username} to Dashboard
      <button
        className="px-2 py-2 ml-6 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-700 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
