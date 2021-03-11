import { useState, useEffect } from "react";

/* Heading */
export default function StationLabel(props) {
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let sup =  props.sup; 
    let inline =  props.inline === '' ? 'heading' : 'heading inline';

    useEffect( () => {
        fetch( process.env.REACT_APP_API_ENDPOINT + '/stations/' + props.text )
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
      }, [props]);

      if (loading) return <p>...</p>;
      if (error) return "Oops!";
    
    return (
        <span className={inline}>
          { values['labelCustom'] ? values['labelCustom'] : values['label'] } 
          { values['unitCustom'] === '' ? '' : ' ('+values['unitCustom']+')' }
          { sup ? <sup><small> {sup} rec(s)</small></sup> : "" }
        </span>
    )
}
