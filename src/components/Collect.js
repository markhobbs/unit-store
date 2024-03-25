import React from 'react';
import { Link } from 'react-router-dom';
import StationLabel from './StationLabel';
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
  
  componentDidMount = () => {
    fetch( process.env.REACT_APP_API_ENDPOINT + '/stations/' + qsStation )
    .then( (response) => { 
      return response.json();  })
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
      headers : { 'Content-Type': 'application/json' },
      body: JSON.stringify( { 
        "label" : qsStation,
        "value" : value
      }) 
    })
    .then( (response) => { return response.json() })
    .finally( () => { this.setState({ submitted : true }) });
  }

  render() {
    const { value, submitted } = this.state;

    return (
      <main>
        { this.state.station ? 
          <h1><StationLabel display="inline" text = { this.state.station }  /></h1> : 
          <span>
            { !this.state.existing || <p>View <Link to='/dashboard'>dashboard</Link>. {/* Or create a new <a href={"?station="+station}>station</a>.*/}</p>}
          </span> }  
        { submitted ? 
          <p>Recorded! Return to <Link to='/dashboard'>dashboard</Link>.</p>
          : 
          qsStation === ""  ||
   
          <form onSubmit={this.onSubmit}>
            <br />
            <input
              name="value"
              type="number"
              step="0.01"
              pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
              defaultValue="0"
              onChange={this.onChange}
              required
            />
            <br />
            <button 
              type="submit" 
              disabled={!value}>
              Record
            </button> or return to <Link to='/dashboard'>dashboard</Link>
          </form>}
      </main>
    );
  }};
