import React from 'react';
import { Link } from 'react-router-dom';
import StationLabel from './StationLabel';

// UTILS
import generateStationLabel from '../utils/generateStationLabel';
//import getQS from '../utils/getQS'; //TODO Get rid of qs
let search = window.location.search;
let params = new URLSearchParams(search);
let qsStation = params.get('station') || '';

export default class Collect extends React.Component {
    
  constructor() {
    super();
    this.state = {
      value : '',
      station : '',
      existing : false,
      unitCustom : '',
      submitted: false
    };
  }
  //this.setState({ station : resp.label });

  /* Using the Station db*/
  componentDidMount = () => {
    // Is the Station New?
    fetch( process.env.REACT_APP_API_ENDPOINT + '/stations/' + qsStation )
    .then ( (response) => { return response.json();  })
    .then( (response) => { 
      this.setState({ 
        existing : true, 
        station :  response.label,
        stationCustom : response.labelCustom,
        unitCustom : response.unitCustom
      });
    })
  }

  onChange = (event) => {
    // Because we named the inputs to match their corresponding values in state, it's super easy to update the state
    this.setState( {[event.target.name] : event.target.value} );
  }

  onSubmit = (event) => {
    event.preventDefault();
    // get our form data out of state
    const { value } = this.state;
    fetch(process.env.REACT_APP_API_ENDPOINT + '/values', { 
      method: 'POST', 
      headers : { 'Content-Type': 'application/json','Accept': 'application/json'}, 
      body: JSON.stringify( { "value" : value, "label" : qsStation } ) //body: JSON.stringify(this.state)  //body: JSON.stringify( { "value" : fname, "label" : lname } )
    })
    .then( (response) => { return response.json() })
    .finally( () => { this.setState({ submitted : true }) });
  }

  render() {
    const { value, submitted/*,email*/ } = this.state;
    return (
      <main>
        { this.state.station ? 
          <h1><StationLabel display="inline" text = { this.state.station }  /></h1> : 
          <span>
            { this.state.existing || <h1>Register your station <Link to={ '/customise?station=' + qsStation }>here</Link>.</h1>}
            { !this.state.existing || <p>View <Link to='/dashboard'>dashboard</Link>. Or create a new <a href={"?station="+generateStationLabel(16,8)}>station</a>.</p>}
          </span>
        }  

        { submitted ? 
          <p>Recorded! Return to <Link to='/dashboard'>dashboard</Link>.</p>
          : 
          qsStation === ""  ||
          <form onSubmit={this.onSubmit}>
            <label>Record</label>
            <input
              type="number"
              name="value"
              value={value}
              onChange={this.onChange}
            />
            <button 
              type="submit" 
              disabled={!value}>
              Submit
            </button>
            {/*<input type="text" name="email" value={email} onChange={this.onChange}/>*/}
          </form>
        }
      </main>
    );
  }
};
