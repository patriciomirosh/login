import React, { Component } from "react";
import axios from 'axios'
import {ConvertJSONToCsv} from '../CompStateLess/JsonToCsv'

const api = axios.create({ baseURL: `http://localhost:3050` });



var index = -1;

export default class Listado extends Component {
  constructor(args) {
    super(args);

    this.state = {
      register10: [],
      Concept: "",
      Ammount: "",
      Date: "",
      Type: "",
      ID: "",
      hidden: true,
      message: "View All Records",
      colorButton: "btn btn-info",
      Username: this.props.Username,
    };
  }
  handleInputChangeNormal=(event) =>{
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    })}
  onClickButton = () => {
    this.getRegister();
    if (this.state.hidden) {
      this.setState({
        hidden: false,
        message: "Hide and Update Records",
        colorButton: "btn btn-danger",
      });
    } else {
      this.setState({
        hidden: true,
        message: "View All Records",
        colorButton: "btn btn-info",
      });
    }
  };

  downloadRegister = (_) => {
    api
      .get(`getAll/get/${this.props.Username1}`,{Username:this.props.Username1,
      Email:this.props.email})
      .then((res) =>
        ConvertJSONToCsv(
          res.data,
          `Table of records of ${this.props.Username1}`
        )
      );
    alert("The logs will be downloaded to your computer");
  };

  getRegister = (_) => {
    api
      .get(`getAll/get/${this.props.Username1}`,{Username:this.props.Username1,
      Email:this.props.email})
      .then((res) => {
        this.setState({ register10: res.data });
      })

      .catch((err) => console.error(err));
  };
  onSubmit = (index, e) => {
    e.preventDefault();
    var a = [];
    let concepts = "Concept" + index;
    let Ammount = "Ammount" + index;
    let Date = "Date" + index;
    let ID = "ID" + index;
    alert(
      "Record number: " + document.getElementById(ID).value + " Updated "
    );
    a.push(document.getElementById(concepts).value);
    a.push(document.getElementById(Ammount).value);
    a.push(document.getElementById(Date).value);
    a.push(document.getElementById(ID).value);

    const urlUpdate = `http://localhost:3050/Crud/update/${this.props.Username1}/${a[3]}`;

    axios.put(urlUpdate, {
      Concept: a[0],
      Ammount: a[1],
      Date: a[2],
      Username:this.props.Username1,
      Email:this.props.email
    });
  };
  onClick = (index, e) => {
    e.preventDefault();

    let ID = "ID" + index;
    let Delete = document.getElementById(ID).value;
    const urlDelete = `http://localhost:3050/Crud/delete/${this.props.Username1}/${Delete}`;
    axios.delete(urlDelete,{Username:this.props.Username1,Email:this.props.email});
    alert(
      "The Record " +
        Delete +
        "has been removed, refresh to see the logs"
    );
  };

  renderRegister = ({ ID, Concept, Ammount, Date, Type }) => {
    if (Type === "in") {
      Type = "Income";
    } else {
      Type = "Expenses";
    }

    index = index + 1;

    return (
      <section>
        <form
          hidden={this.state.hidden}
          name="Form"
          id={index}
          onSubmit={this.onSubmit.bind(this, index)}
        >
          <div className="container">
            <div className="row">
              <div className="col-sm">
                {" "}
                <input
                  type="text"
                  onChange={this.handleInputChangeNormal.bind(this)}
                  name={"Concept0" + index}
                  value={this.state.Concept0}
                  id={"Concept" + index}
                  required="required"
                  placeholder={"Concept: " + Concept}
                />
              </div>
              <div className="col-sm">
                {" "}
                <input
                  name={"Ammount0" + index}
                  placeholder={"Ammount: " + Ammount}
                  id={"Ammount" + index}
                  required="required"
                  value={this.state.Ammount0}
                  onChange={this.handleInputChangeNormal.bind(this)}
                  type="number"
                />
              </div>
              <div className="col-sm">
                {" "}
                <input
                  placeholder={"Date: " + Date}
                  id={"Date" + index}
                  name={"Date0" + index}
                  required="required"
                  value={this.state.Date0}
                  onChange={this.handleInputChangeNormal.bind(this)}
                />
              </div>

              <div className="col- ">
                {" "}
                <label> {" " + Type + " ID "} </label>
              </div>

              <div className="col-sm ">
                {" "}
                <input name="ID" value={ID} id={"ID" + index} />
              </div>
              <div className="col-sm-1">
                {" "}
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
              <div className="col-sm-1">
                {" "}
                <button
                  onClick={this.onClick.bind(this, index)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  };

  render() {
    return (
      <div>
        <div className="col-sm-12 align-self-center text-center">
          <button
            onClick={this.onClickButton}
            className={this.state.colorButton}
          >
            {this.state.message}
          </button>
        </div>
        {this.state.register10.map(this.renderRegister)}
        <p className="container sm" hidden={this.state.hidden}>
          *Date has the format dd / mm / yyyy, if it does not follow this format it will result
          as 00/00/0000 to Date. When deleting or saving Changes to be able
          see them you have to update with the red button
        </p>
        <div className="col-sm-12 align-self-center text-left">
          <button
            className="btn btn-success"
            onClick={this.downloadRegister}
            hidden={this.state.hidden}
          >
            Download the logs
          </button>{" "}
        </div>
      </div>
    );
  }
}