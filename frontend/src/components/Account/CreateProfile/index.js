import React from "react";
import AddMember from "../../AddMember";
import ProfileApi from "../../../api/profileApi";

const CreateProfile = () => {
  const sendResults = userData => {
    ProfileApi.createProfile(userData);
  };

  const titles = {
    healthInfo: "II. Date despre starea ta de sănătate",
    smoker: "Ești fumător?",
    preexistingConditions:
      "Ți-a spus vreun medic că ai oricare dintre următoarele afecțiuni?",
    context: "III. Date despre contextul în care te afli",
    quarantineStatus: "În momentul de față te afli în izolare la domiciliu?",
    livesWithOthersStatus:
      "În momentul de față împarți locuința și cu alte persoane?",
    quarantineStatusOther: "Celelalte persoane se află în izolare la domiciliu?"
  };

  return (
    <AddMember sendResults={sendResults} forYourself={true} titles={titles} />
  );
};

export default CreateProfile;
