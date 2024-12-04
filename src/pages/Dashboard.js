/* Dashboard.js */

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Graph from '../components/Graph';
import StationHeader from '../components/StationHeader';
import generateStationLabel from "../utils/generateStationLabel";

export default function Dashboard() {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/values`)
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((json) => {
        setValues(json);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return "Oops!";

  const groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {}
    );

  let groupedLabels = groupBy(values, "label");
  let station = generateStationLabel(16, 20);
  let stations = [];

  Object.keys(groupedLabels).forEach((label, key) => {
    stations.push(label);
  });

  return <main>
      <h1>Dashboard</h1>
      <h2>All Stations</h2>
      
      <ul className="list">
        {stations && stations.map((station, key) => <li key={key} className="list-item">
          
          <StationHeader
            display="inline"
            value={station}
            sup={groupedLabels[station].length}
          />

          <Graph
            width="320px"
            title={station}
            data={groupedLabels[station]}
          />

          <Link to={`/record?station=${station}`}>Record</Link>{' '}
          <Link to={`/station/details?station=${station}`}>Details</Link>

        </li>)}
      </ul>

      {stations.length > 0 ? <em>Latest 30 record(s) from each station.</em>
        : <em>Currently No Records. Create New <Link to={`/station/create?station=${station}`}>Station</Link>.</em>}
    
    </main>
};
