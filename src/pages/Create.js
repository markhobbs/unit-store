/* Create.js */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from '../components/Select';

const Create = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let station = params.get('station') || 'stationX0';
  const [submitted, setSubmitted] = useState(false);
  const [label, setLabel] = useState(station);
  const [unit, setUnit] = useState("");
  //const [labelValid, setLabelValid] = useState(false);
  //const [unitValid, setUnitValid] = useState(false);

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "label") setLabel(value);
    if (name === "unit") setUnit(value);
  };

  const onChange = (e) => {
    handleUserInput(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_ENDPOINT + "/stations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: station,
        labelCustom: label,
        unitCustom: unit,
      }),
    })
      .then((response) => response.json())
      .then(() => setSubmitted(true));
  };

  return (
    <main>
      <h2>Create Station</h2>

      {submitted ? (
        <p>
          Updated! <Link to={"/record/?station=" + station}>record</Link> a value
        </p>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="label"
            value={label}
            onChange={onChange}
          />
          <br />
          <Select onChange={onChange} />
          <br />
          <br />
          <button type="submit">Create</button> or return to{" "}
          <Link to='/'>dashboard</Link>
        </form>
      )}
    </main>
  );
};

export default Create;
