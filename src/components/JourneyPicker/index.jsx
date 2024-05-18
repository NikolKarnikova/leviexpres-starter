import React, { Fragment, useEffect, useState } from "react";
import "./style.css";

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchCity = async () => {
      const response = await fetch(
        "https://apps.kodim.cz/daweb/leviexpress/api/cities"
      );
      const data = await response.json();
      setCities(data.results);
    };

    const fetchDate = async () => {
      const response = await fetch(
        "https://apps.kodim.cz/daweb/leviexpress/api/dates"
      );
      const data = await response.json();
      setDates(data.results);
    };

    fetchDate();
    fetchCity();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `https://apps.kodim.cz/daweb/leviexpress/api/journey?fromCity=${fromCity}&toCity=${toCity}&date=${date}`
    );
    const data = await response.json();
    onJourneyChange(data.results);
  };
  const disabledButton = fromCity === "" || toCity === "" || date === "";

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form" onSubmit={handleSubmit}>
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select
              value={fromCity}
              onChange={(event) => {
                setFromCity(event.target.value);
              }}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select
              value={toCity}
              onChange={(event) => {
                setToCity(event.target.value);
              }}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            >
              <DatesOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button className="btn" type="submit" disabled={disabledButton}>
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};

export const CityOptions = ({ cities }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {cities.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}
    </>
  );
};

export const DatesOptions = ({ dates }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {dates.map((date) => (
        <option key={date.dateBasic} value={date.dateBasic}>
          {date.dateCs}
        </option>
      ))}
    </>
  );
};
