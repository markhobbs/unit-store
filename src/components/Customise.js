import React from 'react';
import { Link } from 'react-router-dom';
//import { FormErrors } from './FormErrors'

let search = window.location.search;
let params = new URLSearchParams(search);
let station = params.get('station') || '';

export default class Customise extends React.Component {
    
  constructor() {
      super();
      this.state = {
        submitted : false,
        label : station,
        unit: '',
        formErrors: { label: '', unit: ''},
        labelValid: false,
        unitValid: false,
        formValid: false
      };
    }

    validateField (fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let labelValid = this.state.labelValid;
      let unitValid = this.state.unitValid;

      switch(fieldName) {
        case 'label':
          labelValid = value !== "";
          fieldValidationErrors.label = labelValid ? '': ' is empty';
          //unitValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          //fieldValidationErrors.unit = unitValid ? '' : ' is invalid';
          break;
        case 'unit':
          unitValid = value !== "";
          fieldValidationErrors.unit = unitValid ? '': ' is empty';
          break;
        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors, unitValid: unitValid, labelValid: labelValid}, this.validateForm);
    }
    
    validateForm() {
      this.setState({formValid: this.state.unitValid && this.state.labelValid});
    }

    errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
    }

    handleUserInput (e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState( 
        {[name]: value}, 
        () => { this.validateField(name, value) }
      );
    }

    onChange = (e) => {
      this.handleUserInput(e); 
    }

    onSubmit = (e) => {
      e.preventDefault();
      // get our form data out of state
      const { label, unit} = this.state;

      fetch(process.env.REACT_APP_API_ENDPOINT + '/stations', { 
        method: 'POST', 
        headers : { 'Content-Type': 'application/json','Accept': 'application/json'}, 
        body: JSON.stringify( { "label" : station, "labelCustom" : label, "unitCustom" : unit }) 
      })
      .then (response => { return response.json() })
      .then(this.setState({ submitted : true }))
    };

    render() {
      const { label, submitted } = this.state;
      return (
        <main>
          <h1>Customise {label}</h1>

          {/*<div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>*/}

          { submitted ? <p>Updated! <Link to={'/?station='+station}>record</Link> a value</p>
          : <form onSubmit={this.onSubmit}>
              <label htmlFor="label">Label</label>
              <input type="text" name="label" value={label} onChange={this.onChange} /><br /><br />
              {/*<div className={ 'form-group '+this.errorClass(this.state.formErrors.label) }>Label Required</div>*/}
              
              <label htmlFor="unit">Units</label>
              <select name="unit" id="unit" onChange={this.onChange}>
                <option>-------------- Area --------------</option>
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
                <option>-------------- Length --------------</option>           
                <option value="mm">Millimetre(mm)</option>
                <option value="cm">Centi-metre(cm)</option>
                <option value="in">Inch(in)</option>
                <option value="ft">Feet(ft)</option>
                <option value="yd">Yard(yd)</option>
                <option value="m">Metre(m)</option>
                <option value="km">Kilo-metre(km)	</option>
                <option value="mi">Mile(mi)</option>
                <option value="">-------------- Temp --------------</option>
                <option value="c">Degree Celsius(°C)	</option>
                <option value="f">Degree Fahrenheit(°F)</option>	
                <option value="k">Kelvin(K)</option>
                <option>-------------- Time --------------</option>
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
                <option>-------------- Speed --------------</option>
                <option value="mm2">Foot/minute (ft/min)</option>	
                <option value="mm2">Metre/minute (m/min)</option>	
                <option value="mm2">Kilometre/hour (km/h)	</option>
                <option value="mm2">Foot/second (ft/s)</option>	
                <option value="mm2">Miles/hour (mi/h)	</option>
                <option value="mm2">Knot	</option>
                <option value="mm2">Metre/second (m/s)</option>
                <option>-------------- Volume --------------</option>
                <option value="ml">Milli-leter(ml)</option>
                <option value="l">Litre(l) </option>  
                <option value="gal">gallons(gal)</option>
                <option value="m3">cubic metre(m3)</option>
                <option>-------------- Weight --------------</option>
                <option value="mg">Milligram(mg) </option>
                <option value="g">Grams(g)</option>
                <option value="oz">Ounces(oz)</option>
                <option value="lb">Pounds(lb)</option>
                <option value="kg">Kilograms(kg)</option>
                <option value="st">Stone(st)</option>
                <option value="t">Tonne(t)</option>
            </select>
            {/*<div className={ 'form-group '+this.errorClass(this.state.formErrors.unit) }>Unit Required</div>*/}
            <br /><br />
            <button type="submit" disabled={!this.state.formValid}>Submit</button> or <Link to='/'>cancel</Link>
            {/*<button type="submit">Submit</button>*/}
            
          </form> }
        </main>
      );
    }
};
