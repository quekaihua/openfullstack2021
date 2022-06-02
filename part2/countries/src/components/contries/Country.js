import { useEffect, useState } from "react";
import countryService from "../../services/countryService";
const Country = ({ country, show }) => {
  const [weather, setWeather] = useState();
  useEffect(() => {
    countryService.getWeather(country.capital[0]).then((res) => {
      console.log(res);
      setWeather(res.data);
    });
  }, []);
  return (
    <div className={show}>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h1>languages</h1>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="" />
      <h1>Weather in {country.capital[0]}</h1>
      <p>
        <strong>temperature:</strong>
        {weather && weather.main && weather.main.temp}{" "}
      </p>
    </div>
  );
};

export default Country;
