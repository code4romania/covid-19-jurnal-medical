import React from "react";

const renderField = (fieldName, fieldValue) => {
    return <div className="general-info__field"> <strong> {fieldName}:</strong> {fieldValue}</div>
};

const GeneralInfo = (member) => {
    if (!member || !Object.keys(member).length) {
        return <div> Nothing to show yet</div>
    }

    const fields = Object.keys(member["general-info"]);

    const renderFields = fields.map((fieldName) => renderField(fieldName, member["general-info"][fieldName]));

    return <div className="general-info__container">
        {renderFields}
    </div>
};

export default GeneralInfo;