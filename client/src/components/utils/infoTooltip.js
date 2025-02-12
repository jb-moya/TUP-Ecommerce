import React from "react";
import { Tooltip } from "react-tooltip";

const InfoTooltip = ({ id }) => {
    return (
        <Tooltip
            id={id}
            className="z-50"
            style={{
                backgroundColor: "#211c6a",
                color: "#fff",
                borderRadius: "8px",
            }}
        />
    );
};

export default InfoTooltip;
