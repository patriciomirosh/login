import React, {useState, useMemo} from 'react'
import 'firebase/auth'
import axios from 'axios'

const UsuarioContext  = React.createContext();

export function UsuarioProvider(props){
const [email,setEmail]=useState("")
const [pass,setPass]=useState("")
const [register,setRegister]=useState("")
const api = axios.create({ baseURL: `http://localhost:3050` });
const [Username,setUsername]=useState("")


const today = new Date();
//style of the date for the forms
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();    
function changeUsername(Username){
  
    setUsername(Username)}
           
 function changeEmail(event) {
    setEmail(event)}

function setRegistered(event) {
 setRegister(event) }
        

function changePass(event) {
    setPass(event)}    

   

const value = useMemo(()=>{
return({
email,
pass,
register,
changeEmail,
changePass,
setRegistered,
api,
changeUsername,
Username,
date


})


},[email,pass,register,api,Username,date])
return <UsuarioContext.Provider value ={value} {...props}/>
}
export function useUser(){
    const context =React.useContext(UsuarioContext)
    if(!context){
        throw new Error('useUser is not inside of the context provider')
    }
    return context

}