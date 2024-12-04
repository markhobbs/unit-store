import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Graph from '../components/Graph';
import StationLabel from '../components/StationLabel';

export default function More() {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let station = params.get('station') || 'stationX0';
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    stations.push( label );
  })

  return (
    <main>
      <h1>More</h1>
      <ul className="dashboard">
        {stations.map((station, key) => (
          <li key={key} className="dashboard-item">
            <div className="dashboard-item_frame">
              <h2>
                <StationLabel 
                  display="inline" 
                  text = { station } 
                  sup = { groupedLabels[station].length } />
              </h2>
              <Graph width="320px" title={station} data={groupedLabels[station]} />
              + <a href={'/?station=' + station}>Record</a> + <Link to={'/Dashboard'}>Back</Link> 
            </div>
          </li>
        ))}
      </ul>
    </main>)};
