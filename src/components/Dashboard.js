import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Graph from './Graph';

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
  let stations = [];

  Object.keys(groupedLabels).forEach((label, key) => {
    stations.push( label );
  })

  return (
    <main>
      <h1>Dashboard</h1>

      { stations.length > 0  
        ? <p>Latest 10 record(s) from each station.</p> 
        : <p>No records as yet. First create a <Link to='./'>station</Link>.</p> 
      }
      
      <ul className="dashboard">
        {stations.map((station, key) => (
          <li key={key} className="dashboard-item">
            <h2>{station} <small><em>{groupedLabels[station].length} item(s)</em></small></h2>
            <Graph width="320px" title={station} data={groupedLabels[station]} />
            <span>
            + <a href={'./?station=' + station}>Record</a>
            + <Link to={'./more?station=' + station}>Show More</Link>
            </span>
          </li>
        ))}

      </ul>
    </main>
  ) 
};
