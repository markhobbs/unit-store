import React from 'react';
import { Link } from 'react-router-dom';

let search = window.location.search;
let params = new URLSearchParams(search);
let station = params.get('station') || '';

export default class Customise extends React.Component {
    
  constructor() {
      super();
      this.state = {
        label : station,
        submitted : false
      };
    }

    onChange = (e) => { this.setState({ [e.target.name] : e.target.value }) }

    onSubmit = (e) => {

      e.preventDefault();
      // get our form data out of state
      const { label, units, /*email*/ } = this.state;

      fetch(process.env.REACT_APP_API_ENDPOINT + '/stations', { 
        method: 'POST', 
        headers : { 'Content-Type': 'application/json','Accept': 'application/json'}, 
        body: JSON.stringify( { "label" : station, "labelCustom" : label, "unitCustom" : units }) 
      })
      .then (response => { return response.json() })
      .then(this.setState({ submitted : true }))
    };

    render() {
      const { label, submitted/*units*/ } = this.state;
      return (
        <main>
          <h1>Customise {label}</h1>

          { submitted ? 
            <p>Updated! <Link to={'/?station='+station}>record</Link> a value</p>
          : 
          <form onSubmit={this.onSubmit}>

            <label htmlFor="label">Label</label>
            <input type="text" name="label" value={label} onChange={this.onChange} />
            <label htmlFor="units">Units</label>
            <select name="units" id="units" onChange={this.onChange}>
              <option>----- Area -----</option>
              <option value="mm2">Millimetre square(mm2)</option>
              <option value="cm2">Centimetre square(cm2)</option>
              <option value="in2">Square inch(in2)</option>
              <option value="ft2">Square foot(ft2)</option>	
              <option value="yd2">Square yard(yd2)</option>
              <option value="m2">Square metre(m2)</option>
              <option value="ac">Acre(ac)</option>
              <option value="h2">Hectare Square</option>
              <option value="km2">Kilometre(km2)</option>	
              <option value="mi2">Square mile(mi2)</option>
              <option>----- Length -----</option>           
              <option value="mm">Millimetre(mm)</option>
              <option value="cm">Centi-metre(cm)</option>
              <option value="in">Inch(in)</option>
              <option value="ft">Feet(ft)</option>
              <option value="yd">Yard(yd)</option>
              <option value="m">Metre(m)</option>
              <option value="km">Kilo-metre(km)	</option>
              <option value="mi">Mile(mi)</option>
              <option value="">-----Temp-----</option>
              <option value="c">Degree Celsius(°C)	</option>
              <option value="f">Degree Fahrenheit(°F)</option>	
              <option value="k">Kelvin(K)</option>
              <option>----- Time -----</option>
              <option value="ms">Milli-second</option>
              <option value="s">Seconds(s)</option>
              <option value="m">Minutes	</option>
              <option value="h">Hours	</option>
              <option value="d">Days	</option>
              <option value="w">Weeks	</option>
              <option value="m">Month</option>	
              <option value="y">Year</option>	
              <option value="d">Decade	</option>
              <option value="c">Century</option>
              <option>----- Speed -----</option>
              <option value="mm2">Foot/minute (ft/min)</option>	
              <option value="mm2">Metre/minute (m/min)</option>	
              <option value="mm2">Kilometre/hour (km/h)	</option>
              <option value="mm2">Foot/second (ft/s)</option>	
              <option value="mm2">Miles/hour (mi/h)	</option>
              <option value="mm2">Knot	</option>
              <option value="mm2">Metre/second (m/s)</option>
              <option>----- Volume -----</option>
              <option value="ml">Milli-leter(ml)</option>
              <option value="l">Litre(l) </option>  
              <option value="gal">gallons(gal)</option>
              <option value="m3">cubic metre(m3)</option>
              <option>-----Weight -----</option>
              <option value="mg">Milligram(mg) </option>
              <option value="g">Grams(g)</option>
              <option value="oz">Ounces(oz)</option>
              <option value="lb">Pounds(lb)</option>
              <option value="kg">Kilograms(kg)</option>
              <option value="st">Stone(st)</option>
              <option value="t">Tonne(t)</option>
            </select>
            <br /><br />
            <button type="submit">Submit</button> or <Link to='/'>cancel</Link>
          </form> }
        </main>
      );
    }
};
