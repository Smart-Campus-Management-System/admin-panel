import React from "react";

const Header = ({ title }) => {
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">{title}</h1>
            <div>Welcome, Admin!</div>
        </header>
    );
};

export default Header;
