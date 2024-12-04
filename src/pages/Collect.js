import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StationLabel from '../components/StationLabel';

const Collect = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let qsStation = params.get('station') || '';

  const [value, setValue] = useState('');
  const [station, setStation] = useState('');
  const [existing, setExisting] = useState(false);
  const [unitCustom, setUnitCustom] = useState('');
  const [submitted, setSubmitted] = useState(false);

  console.log("UNIT CUSTOM", unitCustom)

  useEffect(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/stations/' + qsStation)
      .then(response => response.json())
      .then(response => {
        setExisting(true);
        setStation(response.label);
        setUnitCustom(response.unitCustom);
      });
  }, [qsStation]);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'value') {
      setValue(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API_ENDPOINT + '/values', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label: qsStation,
        value: value
      })
    })
      .then(response => response.json())
      .finally(() => setSubmitted(true));
  };

  return (
    <main>
      {station ? (
        <h1><StationLabel display="inline" text={station} /></h1>
      ) : (
        <span>
          {!existing || <p>View <Link to='/dashboard'>dashboard</Link>.</p>}
        </span>
      )}
      {submitted ? (
        <p>Recorded! Return to <Link to='/dashboard'>dashboard</Link>.</p>
      ) : (
        qsStation === "" || (
          <form onSubmit={onSubmit}>
            <br />
            <input
              name="value"
              type="number"
              step="0.01"
              pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
              defaultValue="0"
              onChange={onChange}
              required
            />
            <br />
            <button type="submit" disabled={!value}>
              Record
            </button> or return to <Link to='/dashboard'>dashboard</Link>
          </form>
        )
      )}
    </main>
  );
};

export default Collect;
