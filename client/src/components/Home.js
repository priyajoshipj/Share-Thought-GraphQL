import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES, GET_MY_PROFILE } from "../gqloperations/queries";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES, {
    fetchPolicy: "cache-and-network",
  });

  const requestProfile = useQuery(GET_MY_PROFILE, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <h1>Loading</h1>;
  if (error) {
    console.log(error.message);
  }
  if (data?.quotes.length == 0) {
    return <h2>No Quotes available</h2>;
  }
  return (
    <div className="container">
      <div className="row">
        {data?.quotes.map((quote,key) => {
          return (
            <div className="col s4" key={key}>
              <div className="card-area">
                <h6>{quote.name}</h6>
                <div className="right-align">
                 
                  {quote.by._id == requestProfile?.data.user._id ? (
                    <div>
                     ~  <span>You 🚀</span>| <span> Delete ❌ </span>
                    </div>
                  ) : (
                   <div> ~{quote.by.firstName} </div> 
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
