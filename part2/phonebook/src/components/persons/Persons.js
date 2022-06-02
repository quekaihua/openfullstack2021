import phonebookService from "../../services/phonebook";
const Persons = ({ persons, setPersons, setErrorMessage, setStatus }) => {
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      phonebookService
        .deleteById(person.id)
        .then((res) => {
          setPersons((persons) => {
            const newPersons = persons.filter((p) => p.id !== person.id);
            return newPersons;
          });
          setErrorMessage(`Delete ${person.name} success`);
          setStatus("success");

          setTimeout(() => {
            setErrorMessage("");
            setStatus("");
          }, 3000);
        })
        .catch((err) => {
          setPersons((persons) => {
            const newPersons = persons.filter((p) => p.id !== person.id);
            return newPersons;
          });
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setStatus("error");

          setTimeout(() => {
            setErrorMessage("");
            setStatus("");
          }, 3000);
        });
    }
  };

  return persons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDelete(person)}>delete</button>
    </div>
  ));
};

export default Persons;
