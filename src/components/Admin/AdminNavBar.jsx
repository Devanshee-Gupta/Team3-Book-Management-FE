import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import Logo from "/assets/website/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import Darkmode from "../NavBar/Darkmode";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AdminNavBar = (props) => {
  const [sellerRequestTitle, setRequestTitle] = useState("Want to be Seller ?");
  const [sellerRequestLink, setRequestLink] = useState("/seller-request");
  const [seller, setSeller] = useState(false);
  const navigate = useNavigate();
  let session = document.cookie.match(/session_key=([^;]*)/);

//   useEffect(() => {
//     if (session) {
//       try {
//         let session_key = session[1];
//         axios
//           .post("http://127.0.0.1:8000/getrole/", {
//             session_key: session_key,
//           })
//           .then((res) => {
//             if (res.data.role == "Seller") setSeller(true);
//           })
//           .catch((error) => {
//             if (error.response) {
//             } else if (error.request) {
//               console.error(
//                 "No response received from the server:",
//                 error.request
//               );
//             } else {
//               console.error("Error during request setup:", error.message);
//             }
//           });
//       } catch (error) {
//         console.error("Error during adding to cart:", error);
//       }
//     }
//   }, []);
  const DropdownLinks = [
    {
      name: "Requests",
      link: "/admin/request",
    },
    {
      name: "User",
      link: "/admin/user",
    },
    {
      name: "Books",
      link: "/admin/books",
    },
    {
      name: "Logout",
      link: "#",
    },
  ];

//   useEffect(() => {
//     if (seller == true) {
//       setRequestTitle("Seller Dashboard");
//       setRequestLink("/seller-dashboard");
//     }
//   }, [seller]);

  const handleUserDropdown = (data) => {
    if (data.name == "Logout") {
      let session_key = document.cookie.match(/session_key=([^;]*)/)[1];
      let temp = session_key;
      try {
        axios
          .post("http://127.0.0.1:8000/logout/", {
            session_key: temp,
          })
          .then((res) => {
            document.cookie = `session_key=${session_key}; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/;`;
            toast.success("Logged out successfully!");
            navigate("/");
            window.location.reload();
          });
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        // console.error("Error during login:", error);
      }
    }
  };
  return (
    <div className="shadow-lg bg white dark:bg-gray-900 dark:text-white duration-200">
      <div
        className="container py-3 sm:py-0"
        style={{ paddingLeft: "0px", paddingRight: "0px" }}
      >
        <div className="flex justify-between items-center">
          <div>
            <a href="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="" className="w-10" />
              Admin Dashboard
            </a>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Darkmode />
            </div>
            <ul className="items-center gap-4 hidden sm:flex">
              <li>
                <Link
                  to={"/admin/request"}
                  className="inline-block py-4 px-4 hover:text-primary duration-200"
                //   state={{
                //     isAuthenticate: props.isAuthenticate,
                //   }}
                >
                  Requests
                </Link>
              </li>
              {/* {props.isAuthenticate ? ( */}
                <>
                  <li>
                    <Link
                      to={"/admin/user"}
                      className="inline-block py-4 px-4 hover:text-primary duration-200"
                    //   state={{
                    //     isAuthenticate: props.isAuthenticate,
                    //   }}
                    >
                      <div className="flex justify-center items-center gap-1">
                        Users
                      </div>
                    </Link>
                  </li>
                  <li>
                  <Link
                      className="inline-block py-4 px-4 hover:text-primary duration-200"
                      to={"/admin/books"}
                    //   state={{
                    //     isAuthenticate: props.isAuthenticate,
                    //   }}
                    >
                      <div className="flex justify-center items-center gap-1">
                        Books
                      </div>
                    </Link>
                  </li>
                </>
              {/* ) : (
                <span></span>
              )} */}
              {/* dropdown section  */}
            </ul>
           
            {/* {props.isAuthenticate ? ( */}
              <div className="group relative cursor-pointer ml-3">
                <span>
                  <FaRegCircleUser className="text-3xl transition duration-300" />
                </span>
                {/* {dropdown links sections} */}
                <div className="absolute -right-9 z-[10] hidden group-hover:block text-black bg-white p-2 shadow-md w-[150px]">
                  <ul>
                    {DropdownLinks.map((data, index) => (
                      <li key={index}>
                        <Link
                          to={data.link}
                          className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                          onClick={(e) => handleUserDropdown(data)}
                          state={{
                            isAuthenticate: props.isAuthenticate,
                          }}
                        >
                          {data.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            {/* ) : (
              <div></div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminNavBar;
