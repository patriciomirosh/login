import React from 'react'
import { withRouter } from "react-router-dom";
import {auth} from '../../firebase'
import {useUser} from '../../context/userContext'
import Nav from '../CompStateLess/UserNavigator'
import Main from '../CompStateFull/main'
import Last10 from '../CompStateFull/last10'
import Formapp from '../CompStateFull/Formapp'
import ListOfLogs from '../CompStateFull/listOfLogs'
import Footer from '../CompStateFull/footer'  
import Balance from '../CompStateFull/balance'  
import '../../css/App.css'
import '../../css/footer.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const Admin = (props) => {  
    const {Username,changeEmail,email
    } = useUser() 
    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if(auth.currentUser){
            console.log(auth.currentUser.email)
            setUser(auth.currentUser)
            changeEmail(auth.currentUser.email)
        }else{
            console.log('no existe',user)
            props.history.push('/login')
            
        }
    }, [props.history,user,changeEmail])


    return (
        
        <div className="mt-5">
       
            
           
       
              <Router>
              <Nav />
              <Switch>
              <Route path="/admin/balance" exact>
                  
                      
                        <div id="Balance"> <Balance  Username1={auth.currentUser.uid} email={auth.currentUser.email} /></div>
                        
                    </Route>
                    <Route path="/admin/home" exact>
                  
                      
                    <Main mail={email}/>  
                                </Route>
                    <Route path="/admin/last10" exact>
                  
                        
                        <div id="Last"><Last10 Username1={auth.currentUser.uid} email={auth.currentUser.email} /></div>
                    </Route>
                    <Route path="/admin/newlog" exact>
                  
                     
                        <div id="Form"><Formapp Username1={auth.currentUser.uid} email={auth.currentUser.email} /></div>
                    </Route>
                    <Route path="/admin/allLogs" exact>
                  
                    <h1 style={{ marginTop: "1%", textAlign: "center" }}>ABR of Operations </h1>
                      <h2 style={{ textAlign: "center" }}>View All Records</h2>
               <div id="All"><ListOfLogs Username1={Username} email={email} /></div>
                    </Route>
                    </Switch>
              <Footer Username1={auth.currentUser.uid} email={email}/>
              
              </Router>
        </div>
        
            
        
    )
}

export default withRouter(Admin)
