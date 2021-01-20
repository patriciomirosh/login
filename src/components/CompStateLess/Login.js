import React from 'react'
import { NavLink } from 'react-router-dom'
import { auth} from '../../firebase'
import {useUser} from '../../context/userContext'
import {withRouter} from 'react-router-dom'
import axios from 'axios'


const Login = (props) => {

    const {email,pass,changeEmail,changePass,changeUsername,Username,date} = useUser()
    const [error, setError] = React.useState(null)
    const [IsRecord, setIsRecord] = React.useState(true)

 
    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim() || !pass.trim()){
            console.log('Empty email data!')
            setError('Empty email data!')
            return
        }
        if(!pass.trim()){
            console.log('Empty pass data!')
            setError('Empty pass data!')
            return
        }
        if(pass.length < 6){
            console.log('6 or more characters')
            setError('6 or more characters in pass')
            return
        }
        if(IsRecord){
            register()
        }
        if(!IsRecord){
            login()
            
        }
        

    }
 
    const login = React.useCallback(async(history) => {
        try {
           const res= await  auth.signInWithEmailAndPassword(email, pass)
            await changeUsername(res.user.uid)
            alert(res.user.uid)
            changePass('')
            changeEmail('') 
            
            setError(null)
            
            
            props.history.push('/admin/home')                      
    } catch (error) {
            if(error.code === 'auth/user-not-found'){
                setError('User or password Incorrect')
            }
            if(error.code === 'auth/wrong-password'){
                setError('User or password Incorrect')
            }
            console.log(error.code)
            console.log(error.message)
        }
    }, [props.history,email, pass,changeUsername ,changeEmail,changePass])
    
    const register = React.useCallback(async() => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user.uid)       
            await changeUsername(res.user.uid)
            const urlUser = `http://localhost:3050/Table/create/${res.user.uid}`
            const urlUser2 =`http://localhost:3050/Table/newUser/${res.user.uid}`
            
               await axios.post(urlUser)
                // Tabla usuarios 
               await axios.post(urlUser2,{
                    Concept: "first Entry",
                    Ammount: 1,
                    Date: date,
                    Tipe: "in",   
                    Username:Username, 
                    Password:pass
    
                    })   
               await  axios.post(`http://localhost:3050/Table/newUser/`,{
                Username:res.user.uid,
                Mail:email,
                Password:pass})
           alert(`The user ${email} was created correctly `)
           alert(`The user ${res.user.uid} was created correctly `)
            
            changeUsername(res.user.uid)
            console.log(Username)
            changePass('')
            changeEmail('')
            setError(null)
            props.history.push('/admin/home') 
        } catch (error) {
            console.log(error)
            // setError(error.message)
            if(error.code === 'auth/email-already-in-use'){
                setError('User already registered ...')
                return
            }
            if(error.code === 'auth/invalid-email'){
                setError('Invalid email')
                return
            }
        }
    }, [email, pass,changeEmail,changeUsername,Username,changePass,date, props.history])
  

    return (
        <div  className="mt-5">
           <h3  className="text-center">
    {
        IsRecord ? 'Register' : 'Login'
        
    }
</h3>
<hr/>
<div className="row justify-content-center">
    <div className="col-12 col-sm-8 col-md-6 col-xl-4">
        <form onSubmit={procesarDatos}>
            {
                error ? (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                ) : null
            }
            <input 
                type="email" 
                className="form-control mb-2"
                placeholder="Entry Email"
                onChange={ e => changeEmail(e.target.value) }
                value={email}
            />
            <input 
                type="password" 
                className="form-control mb-2"
                placeholder="Introduce your new password"
                onChange={ e => changePass(e.target.value) }
                value={pass}
            />
            <button 
                className="btn btn-lg btn-dark btn-block"
                type="submit"
            >
                {IsRecord ? 'to register' : 'Access'}
            </button>
            <button 
                className="btn btn-sm btn-info btn-block"
                type="button"
                onClick={() => {setIsRecord(!IsRecord) 
                    changeEmail('')
                changePass('')}}
            >
                {IsRecord ? '¿You already have an account?' : '¿You do not have an account?'}
            </button>
            {
         !IsRecord ? (
       <NavLink to="/reset"> <button 
            className="btn btn-sm btn-info btn-danger"
            type="button"
           
        >
            I loss my password
        </button></NavLink>

    ): null
}
        </form>
    </div>
</div>
        </div>
    )
}

export default withRouter(Login)