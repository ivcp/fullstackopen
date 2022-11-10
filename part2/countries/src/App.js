import { useEffect, useState } from "react";
import axios from "axios";
import CountryDetails from "./compontents/CountryDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [matches, setMatches] = useState([]);
  const [warning, setWarning] = useState(false);
  const [viewCountry, setViewCountry] = useState(false);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const search = (e) => {
    const query = e.target.value.toLowerCase();
    const matchingCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query)
    );
    if (matchingCountries.length > 10) {
      setWarning(true);
      setMatches([]);
      return;
    }
    if (matchingCountries.length === 1) {
      setViewCountry(true);
      setWarning(false);
      setMatches(matchingCountries);
      return;
    }
    setViewCountry(false);
    setWarning(false);
    setMatches(matchingCountries);
  };

  const handleClick = (e) => {
    const countryName = e.target.value;
    setViewCountry(true);
    setMatches(
      matches.filter((country) => country.name.common === countryName)
    );
  };

  return (
    <div>
      <div>
        find countries <input onChange={search} />
      </div>

      {warning && <p>Too many matches, specify another filter</p>}
      {!warning &&
        !viewCountry &&
        matches.map((country) => (
          <div key={country.cca2}>
            {country.name.common}{" "}
            <button onClick={handleClick} value={country.name.common}>
              show
            </button>
          </div>
        ))}
      {!warning && viewCountry && (
        <CountryDetails
          name={matches[0].name.common}
          capital={matches[0].capital[0]}
          area={matches[0].area}
          languages={matches[0].languages}
          image={matches[0].flags.png}
        />
      )}
    </div>
  );
}

export default App;
