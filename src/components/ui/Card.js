import React from "react";

const Card = ({ children, className }) => {
    return (
        <div className={`shadow-sm p-3 rounded ${className}`}>
            {children}
        </div>
    );
};

export default Card;
