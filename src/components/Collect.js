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
      value2 : '',
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
    const { value, value2 } = this.state;
    fetch(process.env.REACT_APP_API_ENDPOINT + '/values', { 
      method: 'POST', 
      headers : { 'Content-Type': 'application/json','Accept': 'application/json'}, 
      body: JSON.stringify( { "value" : value, "value2" : value2, "label" : qsStation } ) 
    })
    .then( (response) => { return response.json() })
    .finally( () => { this.setState({ submitted : true }) });
  }

  render() {
    const { value, value2, submitted/*,email*/ } = this.state;
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
              name="value"
              type="number"
              //type="text"
              step="0.01" //min="0"
              //pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
              value={value}
              onChange={this.onChange}
              required
            />
            <input
              name="value2"
              type="number"
              //type="text"
              step="0.01" //min="0"
              //pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
              value={value2}
              onChange={this.onChange}
            />
            <button 
              type="submit" 
              disabled={!value}>
              Submit
            </button>
          </form>
        }
      </main>
    );
  }
};
