import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Graph from './Graph';
import StationLabel from './StationLabel';
import generateStationLabel from '../utils/generateStationLabel';

export default function Dashboard() {
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
        setValues(json) 
      })
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
  let station = generateStationLabel(16, 20)
  let stations = [];
  
  Object.keys(groupedLabels).forEach((label, key) => {
    stations.push( label );
  })

  return (
    <main>
      <h1>Stations dashboard</h1>
      { stations.length > 0  
        ? <p>Latest 30 record(s) from each station.</p> 
        : <p>No records as yet. First create a new <a href={ '/customise?station=' + station}>Station</a>.</p> 
      }
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
              <Graph 
                width = "320px" 
                title = { station } 
                data = { groupedLabels[station] } />
              <a href={'./?station=' + station}>+</a> &nbsp; 
              <Link to={'./more?station=' + station}>...</Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )};
