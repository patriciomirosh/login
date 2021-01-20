import React, { Component } from "react";
import axios from 'axios'
const api = axios.create({ baseURL: `http://localhost:3050` });


export default class Formapp extends Component {
  constructor(args) {
    super(args);

    this.state = {
      Concept: "",
      Ammount: "",
      Date: "",
      Tipe: "",
      acept: "",
      message: "",
      NewLog: true,
      NewLogTextButton: "You want to entry a new log",
      NewLogColorButton: "btn btn-info",
    };
  }
  handleInputChangeNormal=(event) =>{
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    })}
  NewLog=(Concept,Ammount,Date,Tipe,Username,email)=>{api.post(`Crud/add/${Username}`, {
    Concept: Concept,
    Ammount: Ammount,
    Date: Date,
    Tipe: Tipe,
    Username :Username,
    Email:email
  })}

  onSubmit = (e) => {
    if (this.state.acept === true) {
      this.NewLog(this.state.Concept,this.state.Ammount,this.state.Date,this.state.Tipe,this.props.Username1,this.props.email)
      this.setState({
        Concept: "",
        Ammount: "",
        Date: "",
        Tipe: "",
        acept: "",
      });
    }
    e.preventDefault();
  };
  save(e) {
    if (!this.validate()) {
      return;
    }
    this.setState({
      message:
        "The Registry " + this.state.Concept + " was created correctly",
    });
  }
  validate() {
    if (this.state.acept !== true) {
      this.setState({
        message: "Acept the terms",
      });
      return false;
    }
    return true;
  }

  onClickForm = () => {
    if (this.state.NewLog === false) {
      this.setState({
        NewLog: true,
        NewLogTextButton: "Do you want to enter a new record??",
        NewLogColorButton: "btn btn-info",
      });
    } else {
      this.setState({
        NewLog: false,
        NewLogTextButton: "Hide Form",
        NewLogColorButton: "btn btn-danger",
      });
    }
  };

  render() {
    return (
      <div>
        <h1 style={{ marginTop: "1%", textAlign: "center" }}>
          {" "}
          ABR of operations{" "}
        </h1>

        <h2 style={{ marginTop: "2%", textAlign: "center" }}>New Record</h2>
        <div
          className="col-sm-12 align-self-center text-center"
          onClick={this.onClickForm}
        >
          <button className={this.state.NewLogColorButton}>
            {this.state.NewLogTextButton}{" "}
          </button>
        </div>
        <form hidden={this.state.NewLog} onSubmit={this.onSubmit}>
          <div id="List" className="container-sm ">
            <div className="row">
              <h2 className="col-sm-12 align-self-center text-center ">
                Enter the values ​​for the New Record
              </h2>
            </div>
            <div className="row">
              <div className="col-sm-12 align-self-center text-center ">
                {" "}
                <label htmlFor="Concept">name of Concept: .</label>
                <input
                  name="Concept"
                  id="Concept"
                  type="text"
                  value={this.state.Concept}
                  onChange={this.handleInputChangeNormal.bind(this)}
                  required="required"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 align-self-center text-center">
                {" "}
                <label htmlFor="Ammount">Ammount: . </label>
                <input
                  id="Ammount"
                  type="number"
                  onChange={this.handleInputChangeNormal.bind(this)}
                  value={this.state.Ammount}
                  name="Ammount"
                  required="required"
                />
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 align-self-center text-center">
                {" "}
                <label> Date: .</label>
                <input
                  htmlFor="Date"
                  id="Date"
                  type="date"
                  required="required"
                  name="Date"
                  onChange={this.handleInputChangeNormal.bind(this)}
                  value={this.state.Date}
                />
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 align-self-center text-center">
                {" "}
                <label htmlFor="Tipe">Tipe: .</label>
                <select
                  required="required"
                  id="Tipe"
                  name="Tipe"
                  placeholder="Seleccione una opcion"
                  value={this.state.Tipe}
                  onChange={this.handleInputChangeNormal.bind(this)}
                >
                  <option value="">Select an option </option>
                  <option value="in">Entry </option>
                  <option value="eg">Egress </option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 align-self-center text-center">
                {" "}
                <br />
                <input
                  type="checkbox"
                  id="acept"
                  name="acept"
                  value={this.state.acept}
                  onChange={this.handleInputChangeNormal.bind(this)}
                />
                <label htmlFor="acept">accept the terms .</label>
                <br></br>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 align-self-center text-center">
                {" "}
                <button
                  required="required"
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.save.bind(this)}
                >
                  {" "}
                  Save Changes
                </button>
                <span style={{ color: "green" }}>{this.state.message}</span>
                <br />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
