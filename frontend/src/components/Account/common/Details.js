import React from "react";

const renderField = (fieldName, fieldValue) => {
    return <div className="member__field"> <strong> {fieldName}:</strong> {fieldValue}</div>
};

const Details = (member) => {
    console.log('Object.keys(member)', Object.keys(member));
    if (!member || !Object.keys(member).length) {
        return <div> Nothing to show yet</div>
    }

    const fields = Object.keys(member);

    const renderFields = fields.map((fieldName) => renderField(fieldName, member[fieldName]));

    return <div className="details__container">
        {renderFields}
    </div>
};

export default Details;