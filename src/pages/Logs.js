/* Logs.js */

import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import StationHeader from '../components/StationHeader';
import moment from 'moment';
moment().format();

export default function Logs() {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/values')
      .then(response => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(json => {
        setValues(json);
      })
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return "Loading...";
  if (error) return "Oops!";
  
  return (
    <main>
      <h1>Logs</h1>
      
      { values.length > 0  
        ? <p>Total of {values.length} record(s)</p> 
        : <p>No records as yet. First create a <Link to='./'>station</Link>.</p> 
      }

      <ul className="logs">
        { values.map((value) => <li key={value._id} className="log-item">
            
            <h3 className="inline">
              {value.value}
            </h3>

            <Link to={`/station/details?station=${value.label}`}>
              <StationHeader 
                display="inline" 
                value={value.label} />
            </Link>

            <small>{moment(value.created).format('LLLL')}</small>

          </li>)}
       </ul>
    </main>
  )  
}