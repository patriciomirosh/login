

import React from 'react'
import { NavLink } from 'react-router-dom';
import icon from '../sample/icon1.png'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

 
const Nav =()=> {
      
  
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
      };
    
    
     
        return(<header className="header">

    
        <div className="container logo-nav-containter ">
            <div className="LOGO " >
                <img src={icon} className="logo2" alt="icon"/>
            </div>
       <div><Button id="OptionMenu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
Menu</Button>           
           
            <Menu    id="simple-menu"
        anchorEl={anchorEl}
       
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="MenuOption"> 
              
              <NavLink    to="/admin/home" exact onClick={handleClose} >  <MenuItem style={{backgroundColor:"#D2D4DE",color:"black"}}> HOME</MenuItem></NavLink>
                   <NavLink to="/admin/balance"  onClick={handleClose} > <MenuItem style={{backgroundColor:"#D2D4DE",color:"black"}}>BALANCE</MenuItem></NavLink>
                    <NavLink to="/admin/last10"  onClick={handleClose} ><MenuItem style={{backgroundColor:"#D2D4DE",color:"black"}}>LAST 10 RECORDS</MenuItem></NavLink>
                   <NavLink to="/admin/newlog" onClick={handleClose} > <MenuItem  style={{backgroundColor:"#D2D4DE",color:"black"}}>NEW RECORDS</MenuItem></NavLink>
                   <NavLink to="/admin/allLogs" onClick={handleClose} > <MenuItem  style={{backgroundColor:"#D2D4DE",color:"black"}}> ALL THE RECORDS</MenuItem></NavLink>
               
            </Menu>
            </div> 
        </div>
  
    </header> );
    
      }
    
    export default Nav
    