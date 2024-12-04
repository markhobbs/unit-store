/* Record.js */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StationHeader from '../components/StationHeader';

const Record = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let qsStation = params.get('station') || '';

  const [value, setValue] = useState('');
  const [station, setStation] = useState('');
  const [existing, setExisting] = useState(false);
  const [unitCustom, setUnitCustom] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (qsStation) {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/stations/${qsStation}`)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(response => {
          setExisting(true);
          setStation(response.label);
          setUnitCustom(response.unitCustom);
        })
        .catch(err => {
          console.error(err);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [qsStation]);
  console.log(unitCustom)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/stations/${qsStation}`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(response => {
        setExisting(true);
        setStation(response.label);
        setUnitCustom(response.unitCustom);
      })
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
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
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/values`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        label: qsStation,
        value: value
      })
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(() => setSubmitted(true))
      .catch(err => {
        console.error(err);
        setError(err);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oops! Something went wrong.</p>;

  return <main>

      <h2>Record</h2>
      
      {station ? 
        <StationHeader 
          display="inline" 
          value={station} /> 
        : <span>{!existing || <p>View <Link to='/'>dashboard</Link>.</p>}</span>}

      {submitted ? 
        <p>Recorded! Return to <Link to='/'>dashboard</Link>.</p> 
        : qsStation 
          && <form onSubmit={onSubmit}>
            
            <input
              name="value"
              type="number"
              step="0.01"
              value={value}
              placeholder="Insert Value"
              onChange={onChange}
              required
            />

            <button 
              type="submit" 
              disabled={!value}>
              Record
            </button> or return to <Link to='/'>dashboard</Link>
          </form>}
    </main>
};

export default Record;