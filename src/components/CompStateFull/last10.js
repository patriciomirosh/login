import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { Component } from "react";
import axios from 'axios'
const api = axios.create({ baseURL: `http://localhost:3050` });


export default class Last10 extends Component {
  constructor(args) {
    super(args);

    this.state = {
      register: [],
      listOfIncomeAndExpences: "",
    };
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.Tipe === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.getRegister();
    this.setState({
      [name]: value,
    });
  }
  last10=(Username,email)=>api.get(`/getAll/last10/${Username}`,{Username :Username,
    Email:email})
  .then((res) => this.setState({ register: res.data }))
  .catch((err) => console.error(err))


  
  getRegister = (_) => {
    this.last10(this.props.Username1,this.props.email)
  };
  renderRegister = ({ ID, Concept, Ammount, Date, Tipe }) => {
    if (Tipe === "in" && this.state.listOfIncomeAndExpences === "0") {
      return (
        <span class="container-fluid ">
        <span class="row"  id="ContainerLogList">
        
          
        <span class="col-sm"  >
            <span >{"ID: " + ID}</span>
          </span>
          <span class="col-sm" >
            <span >{"Concept: " + Concept}</span>
          </span>
          <span class="col-sm" >
            <span >{"Ammount: " + Ammount}</span>
          </span>
          <span class="col-sm" >
            <span >{"Date: " + Date}</span>
          </span>
          <span class="col-sm" >
            <span >{"Tipe: " + Tipe}</span>{" "}
          </span>
        </span>
        </span>
      );
    } else if (Tipe === "eg" && this.state.listOfIncomeAndExpences === "1") {
      return (
        <span class="container-fluid ">
        <span class="row"  id="ContainerLogList">
        
          
        <span class="col-sm"  >
            <span >{"ID: " + ID}</span>
          </span>
          <span class="col-sm" >
            <span >{"Concept: " + Concept}</span>
          </span>
          <span class="col-sm" >
            <span >{"Ammount: " + Ammount}</span>
          </span>
          <span class="col-sm" >
            <span >{"Date: " + Date}</span>
          </span>
          <span class="col-sm" >
            <span >{"Tipe: " + Tipe}</span>{" "}
          </span>
        </span>
        </span>
      );
    }
  };

  ;

  render() {
    return (
      <form  >
         <hr />
            <h2 style={{ textAlign: "center" }} >View Latest Records</h2>
      <div  className="col-sm-12 align-self-center text-center " id="Last10Selector">
      <label>To see the last 10 New records (income or expenses) select an option:  .</label>
        <select
          className="btn btn-info"
          id="listOfIncomeAndExpences"
          name="listOfIncomeAndExpences"
          value={this.state.listOfIncomeAndExpences}
          onChange={this.handleInputChange.bind(this)}
         
        >
          
          <option value="">Select an option</option>
          <option value="0" >Income</option>
          <option value="1" >Expenses</option>
        </select>
        </div>
        <div> {this.state.register.map(this.renderRegister)} </div>
      </form>
    );
  }
}
