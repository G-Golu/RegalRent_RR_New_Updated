// import { useNavigate } from "react-router-dom";
// import "../../Only_User/userAll.css";

// const Header = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <header className="header">
//       <div className="header-left">
//         <h3>User Panel</h3>
//       </div>

//       <div className="header-right">
//         <span className="user-name">
//           Welcome, {user?.name || "User"}
//         </span>

//        <button
//   className="logout-btn"
//   onClick={() => navigate("/dashboard/user/logout")}
// >
//   Logout
// </button>
//       </div>
//     </header>
//   );
// };

// export default Header;


//  today comment for login -- 17-03-2026















import { useNavigate } from "react-router-dom";
import "../../Only_User/userAll.css";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="header">
      <div className="header-left">
        <h3>User Panel</h3>
      </div>

      <div className="header-right">
        <span className="user-name">
          Welcome, {user?.name || "User"}
        </span>

       <button
  className="logout-btn"
  onClick={() => navigate("/dashboard/user/logout")}
>
  Logout
</button>
      </div>
    </header>
  );
};

export default Header;