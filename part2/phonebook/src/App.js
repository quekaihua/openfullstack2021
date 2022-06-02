import React, { useState, useEffect } from "react";
import axios from "axios";

import Persons from "./components/persons/Persons";
import PersonForm from "./components/personform/PersonForm";
import Filter from "./components/filter/Filter";
import Notification from "./components/notification/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value.trim());
  };

  const getPersons = () => {
    let filterPersons = persons;
    if (search !== "") {
      const s = search.toLowerCase();
      filterPersons = persons.filter(
        (person) => person.name.toLowerCase().indexOf(s) !== -1
      );
    }
    return filterPersons;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={status} message={errorMessage} />
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
        setStatus={setStatus}
      />
      <h2>Numbers</h2>
      <Persons
        persons={getPersons()}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
        setStatus={setStatus}
      />
    </div>
  );
};

export default App;
