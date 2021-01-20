import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/CompStateLess/NavBar'
import Login from './components/CompStateLess/Login'
import Admin from './components/CompStateLess/Admin'
import {auth } from './firebase'
import Resetpass from './components/CompStateLess/Resetpass'



const App = () => {
    
    const [firebaseUser, setFirebaseUser] = React.useState(false)
    
    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log(user)
            if(user){
                setFirebaseUser(user)
            }else{
                setFirebaseUser(null)
            }
        })
    }, [])
    
    return (
        firebaseUser !== false ? (
       
       <Router>
           
            <div className="container">
                <Navbar firebaseUser={firebaseUser} />
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/admin/home" >
                   <Admin/>
                    </Route>
                    <Route path="/reset" exact>
                    <Resetpass/>
                    </Route>
                </Switch>
            </div>
        </Router>
       
    ) : (
        <div>Cargando...</div>
        
    )
   
    
    )
}
    


    export default App
   