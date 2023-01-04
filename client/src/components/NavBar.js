import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GET_MY_PROFILE } from "../gqloperations/queries";
import { useQuery } from "@apollo/client";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_MY_PROFILE, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <nav>
      <div className="nav-wrapper #2f3640">
        <div className="container">
          <Link to="/" className="brand-logo left">
            {data?.user ?
              `Hey, ${data?.user.firstName}  Share Your Thoughts` : 
            `Share Thoughts` }
          </Link>
          <ul id="nav-mobile" className="right">
            {token ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/create">Create</Link>
                </li>
                <li>
                  <button
                    className="white btn logout-btn"
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
