import React, { Component } from 'react'
import axios from 'axios'
const messageVisibilty="Show Current Balance"
const messageHidden="Hide Current Balance"
const api = axios.create({ baseURL: `http://localhost:3050` });


export default class Balance extends Component {
     
    constructor(args){
        super(args)
    
        this.state ={
            BalanceIng: "",
            BalanceEg:"",
            hidden:true,
            message:"Show Current Balance",
            colorButton:"btn btn-info",
            pato:"",
            Username1:this.props.Username1,
            email:this.props.email

        }
    }
    getBalanceIng = (Username,email) =>{
        api.get(`/getAll/balance/${Username}`,
          {
              Username :Username,
              Email:email
          }).then(res1 => this.setState({BalanceIng:res1.data[0]["added"]})).catch(err => console.error(err)) 
      
      }
      getBalanceEg = (Username,email) =>{
         
          api.get(`/getAll/balanceEg/${Username}` ,{
            Username :Username,
            Email:email
        }).then(res1 => this.setState({BalanceEg:res1.data[0]["added"]})).catch(err => console.error(err))}
          
      
    onClick= () =>{
        
        
        if (this.state.hidden){
        
        
        this.setState({hidden:false,
        message:messageHidden,
        colorButton:"btn btn-danger"})
        this.getBalanceIng(this.props.Username1,this.props.email)   
        this.getBalanceEg(this.props.Username1,this.props.email)

        }
        
        else{ this.setState({hidden:true})
        this.setState({message:messageVisibilty,
        colorButton:"btn btn-info"})
        this.getBalanceIng(this.props.Username1,this.props.email)
        this.getBalanceEg(this.props.Username1,this.props.email)
    }    
    }    
    render() { 
        return (
        <div>
            {console.log(this.props.Username1)}
            {console.log(this.props.email)}
             <hr />
            <h2 style={{ textAlign: "center" }} > Actual Balance </h2>
            
           <div className="col-sm-12 align-self-center text-center " ><button value={this.state.ListadoIngresooEgreso}
          onClick={this.onClick} name="balanceButon" className={this.state.colorButton} > {this.state.message}</button></div> 
            <div className="container sm"  id="ActualBalance" style={{width:"60%"}} hidden={this.state.hidden}>
                
                <h1  className="col-sm-12 align-self-center text-center " >Your actual balance is: </h1>
         <h2 className="col-sm-12 align-self-center text-center "> <b>{this.state.BalanceIng-this.state.BalanceEg+" $"}  </b>  </h2>
            </div></div>
        )
    }
}
