import React from "react";
import { Button } from "@code4ro/taskforce-fe-components";
import "./evalutation.scss";
import { useHistory } from "react-router-dom";

const FinishFormButton = () => {
  const history = useHistory();
  return (
    <div className={"call-to-action"}>
      <Button onClick={() => history.push("/")} size={"large"} inverted={true}>
        Intoarce-te la pagina principala
      </Button>
    </div>
  );
};

export default FinishFormButton;
