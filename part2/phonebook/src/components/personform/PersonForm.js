import React, { useState } from "react";
import phonebookService from "../../services/phonebook";
const PersonForm = ({ persons, setPersons, setErrorMessage, setStatus }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const exists = persons.find((person) => person.name === newName);
    if (exists) {
      if (
        window.confirm(
          `${exists.name} is alredy added to phonebook, replace the old number with a new one?`
        )
      ) {
        phonebookService
          .update(exists.id, { ...exists, number: newNumber })
          .then((res) => {
            setPersons(
              persons.map((person) =>
                person.id !== exists.id ? person : res.data
              )
            );
            setNewName("");
            setNewNumber("");

            setErrorMessage(`Update ${newName}`);
            setStatus("success");

            setTimeout(() => {
              setErrorMessage("");
              setStatus("");
            }, 3000);
          })
          .catch((err) => {
            setErrorMessage(err.message);
            setStatus("error");

            setTimeout(() => {
              setErrorMessage("");
              setStatus("");
            }, 3000);
          });
      }
    } else {
      phonebookService
        .create({ name: newName, number: newNumber })
        .then((response) => {
          setPersons((persons) => {
            return persons.concat(response.data);
          });
          setNewName("");
          setNewNumber("");

          setErrorMessage(`Add ${newName}`);
          setStatus("success");

          setTimeout(() => {
            setErrorMessage("");
            setStatus("");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(err.response.data.error);
          setStatus("error");

          setTimeout(() => {
            setErrorMessage("");
            setStatus("");
          }, 3000);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          onChange={(e) => {
            setNewName(e.target.value.trim());
          }}
          value={newName}
        />
      </div>
      <div>
        number:{" "}
        <input
          onChange={(e) => {
            setNewNumber(e.target.value.trim());
          }}
          value={newNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
