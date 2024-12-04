/* StationHeader */

import React from 'react';
import { useState, useEffect } from "react";

export default function StationHeader(props) {
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {sup, inline, value } = props;
    let styleClasses =  inline === '' ? 'heading' : 'heading inline';

    useEffect( () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/stations/${value}`)
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
      }, [props, value]);

      if (loading) return <p>...</p>;
      if (error) return "Oops!";
    
    return (
        <h3 className={styleClasses}>

            {values['labelCustom'] ? values['labelCustom'] : values['label'] } 
            
            <br />
            
            {values['unitCustom'] ? <small>
                <sup>{values['unitCustom']}</sup>
              </small> : ''}
            
            <br />

            { sup ? <sup>
                <small> {sup} record(s)</small>
              </sup> 
            : "" }

        </h3>
    )
}
