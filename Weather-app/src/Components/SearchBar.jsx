import React, { useState } from "react";

const SearchBar = ({ onSearch, onReset }) => {
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city && state) {
            onSearch(city, state); // Trigger the search with city and state
        }
    };

    const handleClear = () => {
        setCity(""); // Reset City
        setState(""); // Reset State
        onReset(); // Call the parent reset function
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <button type="submit">Search</button>
                <button type="button" onClick={handleClear}>Reset</button>
            </form>
        </div>
    )
}

export default SearchBar;