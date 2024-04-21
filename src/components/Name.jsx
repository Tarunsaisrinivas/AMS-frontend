import React, { useEffect, useState } from "react";
import axios from "axios";
import cookies from "react-cookies";

import constants from "../global/constants";

const Name = () => {
  const [name, setName] = useState();

  console.log(
    `${constants.serverUrl}/user/auth/validate-user/${cookies.load("admin")}`
  );

  const getName = async () => {
    try {
      const response = await axios.get(
        `${constants.serverUrl}/user/auth/validate-user/${cookies.load(
          "admin"
        )}`
      );
      console.log(response);
      if (response.data.stat) {
        setName(response.data.name);
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  return <div>Welcome: {name}</div>;
};

export default Name;
