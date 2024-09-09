/* Station.js */

import React from "react";
import { Link } from "react-router-dom";
import Select from "./Select";

let search = window.location.search;
let params = new URLSearchParams(search);
let station = params.get("station") || "";

export default class Station extends React.Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
      label: station,
      unit: "",
      labelValid: false,
      unitValid: false,
    };
  }
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  onChange = (e) => {
    this.handleUserInput(e);
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label, unit } = this.state;
    fetch(process.env.REACT_APP_API_ENDPOINT + "/stations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: station,
        labelCustom: label,
        unitCustom: unit,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(this.setState({ submitted: true }));
  };

  render() {
    const { label, submitted } = this.state;
    return (
      <main>
        <h1>Create Station</h1>
        <br />
        {submitted ? (
          <p>
            Updated! <Link to={"/?station=" + station}>record</Link> a value
          </p>
        ) : (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="label"
              value={label}
              onChange={this.onChange}
            />
            <br />
            <Select onchange={this.onChange} />
            <br />
            <br />
            <button type="submit">Create</button> or return to{" "}
            <Link to="/dashboard">dashboard</Link>
          </form>
        )}
      </main>
    );
  }
}
