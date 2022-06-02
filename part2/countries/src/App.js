import React, { useState, useEffect } from "react";
import Countries from "./components/contries/Countries";
import service from "./services/countryService";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState([]);
  const [show, setShow] = useState("");

  useEffect(() => {
    service.getAll().then((res) => {
      console.log(res);
      setCountries(res.data);
    });
  }, []);

  const handleChange = (e) => {
    const s = e.target.value.toLowerCase();
    setSearch(e.target.value);
    setShow("");
    setFilters(
      countries.filter((country) => {
        return country.name.common.toLowerCase().indexOf(s) !== -1;
      })
    );
  };

  return (
    <div>
      find countries
      <input value={search} onChange={handleChange} />
      <Countries countries={filters} show={show} setShow={setShow} />
    </div>
  );
};

export default App;
