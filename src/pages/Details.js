/* Details.js */

import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Graph from '../components/Graph';
import StationHeader from '../components/StationHeader';

export default function Details() {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let station = params.get('station') || 'stationX0';
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addClass, setAddClass] = useState(false);

  useEffect(() => {
    if (values.length === 1) {
      setAddClass(true);
    } 
  }, [values])


  useEffect(() => {
    async function fetchDetails() {
      await fetch( process.env.REACT_APP_API_ENDPOINT + '/values/' + station + '/details' )
      .then( (response) => { return response.json() })
      .then( (json) => { 
        setValues(json) 
      })
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    }
    fetchDetails()
  }, [station])

  if (loading) return <p>Loading...</p>;
  if (error) return "Oops!";

  const groupBy = (items, key) => items.reduce( (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }), 
    {},
  );

  let groupedLabels = groupBy( values, 'label' );
  let stations = [];

  Object.keys(groupedLabels).forEach((label, key) => {
    stations.push(label);
  })

  return (
    <main>
      <h1>Details</h1>
      <ul className="list">
        {stations.map((station, key) => <li key={key} className={addClass? "list-item list-item-full": "list-item"}>
              <StationHeader 
                display="inline" 
                value={station} 
                sup={groupedLabels[station].length} />
      
              <Graph width="320px" title={station} data={groupedLabels[station]} />
              
              <Link to={`/record?station=${station}`}>Record</Link>{' '}
              <Link to={'/'}>Dashboard</Link>

          </li>
        )}
      </ul>
    </main>)};
