import Country from "./Country";
import { useState } from "react";

const Countries = ({ countries, show, setShow }) => {
  if (!countries) {
    return null;
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return countries.map((country) => {
      return (
        <div>
          {country.name.common}{" "}
          <button
            onClick={() => {
              if (show === "") {
                setShow(country.name.common);
              } else {
                setShow("");
              }
            }}
          >
            {show === country.name.common ? "hidden" : "show"}
          </button>
          {show === country.name.common && (
            <Country country={country} show="show" />
          )}
        </div>
      );
    });
  } else if (countries.length === 1) {
    const [country] = countries;
    return <Country country={country} show="show" />;
  }
};

export default Countries;
