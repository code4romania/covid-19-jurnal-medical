import React from "react";
import { Button } from "@code4ro/taskforce-fe-components";
import { useHistory } from "react-router-dom";

const Home = () => {
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

export default Home;
