import React from "react";
import { Button } from "@code4ro/taskforce-fe-components";
import { useHistory } from "react-router-dom";

import "./evalutation.scss";

const FinishFormButton = () => {
  const history = useHistory();

  return (
    <div className={"call-to-action"}>
      <Button
        onClick={() => history.push("/account")}
        size={"large"}
        inverted={true}
      >
        Intoarce-te la pagina principala
      </Button>
    </div>
  );
};

export default FinishFormButton;
