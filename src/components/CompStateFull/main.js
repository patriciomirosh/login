import React, { Component } from 'react'
import imp2 from '../sample/imp2.png'
export default class Main extends Component {
    render() {
        return (
            <main>
                 <h1 className="col-sm-12 align-self-center text-center " id="HeaderHome"><em>Home</em></h1>
               
        <div className="container">
            <div className="row">
                <div className="col-6" >
                    <img src={imp2 } alt="Work App Team" className="img-fluid" />
                </div>
                <div className="col-5" id="ResizeTextOur">
                  
        <h2>Welcome </h2>
        <h5>{this.props.mail}</h5>
                    <p>Welcome to the Personal Records Manager. By following all the steps correctly you are in a position to manage your income and expenses.
                                               For more information contact your Supplier.
                    </p>
                      
                </div>
            </div>
<br/>
        </div>
    </main>
        )
    }
}
