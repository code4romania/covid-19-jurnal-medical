import React from "react";
import { Button } from "@code4ro/taskforce-fe-components";
import PropTypes from "prop-types";
import "./evalutation.scss";
import { withRouter } from "react-router-dom";

const FinishFormButton = ({ history }) => {
  return (
    <div className={"call-to-action"}>
      <Button onClick={() => history.push("/")} size={"large"} inverted={true}>
        Intoarce-te la pagina principala
      </Button>
    </div>
  );
};

export default withRouter(FinishFormButton);

FinishFormButton.propTypes = {
  history: {
    push: PropTypes.func
  }
};
