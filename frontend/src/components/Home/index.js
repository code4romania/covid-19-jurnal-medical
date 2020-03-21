import React from "react";
import { Button } from "@code4ro/taskforce-fe-components";
import { useHistory } from "react-router-dom";
// import { AuthService } from "../../auth";
import { connect } from "react-redux";

const Home = ({ tryToLoadUser }) => {
  tryToLoadUser();
  const history = useHistory();

  function handleClick() {
    history.push("/despre");
  }

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleClick}>About</Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    tryToLoadUser: () => {
      var loadedUser = window.sessionStorage.getItem("user");
      var user = null;
      try {
        user = JSON.parse(loadedUser)
      } catch (e) {console.log(e)}
      if (loadedUser && user) {
        dispatch({ type: "user/set", payload: user });
      }
    }
  };
};
export default connect(null, mapDispatchToProps)(Home);
