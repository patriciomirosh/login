import React, { Component } from 'react'
import consultas from "../sample/iconsFooter/consultas.png"
import whatsapp from "../sample/iconsFooter/whatsapp.png"
import email from "../sample/iconsFooter/email.png"
import facebook from "../sample/iconsFooter/facebook.png"
import instagram from "../sample/iconsFooter/instagram.png"
import ContactForm from './conctactForm'
export default class Footer extends Component {
    constructor(args) {
        super(args);
        this.state={

        contactMe:true
        };

    }
   
    onClick =()=>{
        if(this.state.contactMe===true ){this.setState({contactMe:false})}
        else{this.setState({contactMe:true})}
    } 
    
    render() {
        
        return (
           <div>
           
            <footer style={{marginTop:"25%",}}>
            <div class="father">
                <ul>
                    <li>
                        <img src={consultas} alt="queries" class="icon1"/>
                        <button  className="btn btn-info" onClick ={this.onClick} >Contact me </button>
                    </li>
                    <li>
                        <img src={whatsapp} alt="cel" class="icon1"/>
                        <label>+54 9 3756 532653</label>
                    </li>
                    <li>
                        <img src={email} alt="mail" class="icon1"/>
                        <label>mirospatricio@gmail.com</label>
                    </li>
                </ul>
                <ul>
                    <li>
                        <h4>Our social networks</h4>
                    </li>
                    <div class="nets">
                        <li>
                            <img src={facebook} alt="facebook" class="icon2"/>
                            <a href="https://www.facebook.com/patricio.pereyra.50/" className="hide queries">Facebook
                            </a>
                        </li>
                        <li>
                            <img src={instagram} alt="instagram" class="icon2"/>
                            <a href="https://www.instagram.com/pato_16_2/"
                                class="hide queries">Instagram</a>
                        </li>
                    </div>
                </ul>
            
            </div>
        </footer>
        <div hidden={this.state.contactMe}>
        <ContactForm Username1={this.props.Username1} email={this.props.email} />
        </div>
        </div>

        )
    }
}
