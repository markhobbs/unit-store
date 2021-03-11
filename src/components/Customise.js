import React from 'react';
import { Link } from 'react-router-dom';
//import { FormErrors } from './FormErrors'
import Select from './Select';

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

          { submitted ? 
            <p>Updated! <Link to={'/?station='+station}>record</Link> a value</p>
          : 
          <form onSubmit={this.onSubmit}>
              <label htmlFor="label">Label</label>
              <input type="text" name="label" value={label} onChange={this.onChange} /><br /><br />
              {/*<div className={ 'form-group '+this.errorClass(this.state.formErrors.label) }>Label Required</div>*/}
              
              <label htmlFor="unit">Units</label>
              <Select onchange={this.onChange} />
            {/*<div className={ 'form-group '+this.errorClass(this.state.formErrors.unit) }>Unit Required</div>*/}
            <br /><br />
            <button type="submit" disabled={!this.state.formValid}>Submit</button> or <Link to='/'>cancel</Link>
            {/*<button type="submit">Submit</button>*/}
          </form>}

        </main>
      );
    }
};
