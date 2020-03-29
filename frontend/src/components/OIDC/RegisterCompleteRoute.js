import React from "react";
import { Redirect } from "react-router-dom";
import { UserThunks } from "../../store/UserReducer";

const RegisterCompleteRoute = () => {
  UserThunks.authenticate(); 
  return <Redirect to="/"></Redirect>;
};

export default RegisterCompleteRoute;
