// I have encountered an error in this routes I will use more lately
import axios from 'axios'
import {ConvertJSONToCsv} from '../CompStateLess/JsonToCsv'



const api = axios.create({ baseURL: `http://localhost:3050` });

const routes = {



getBalanceIng : (Username,email) =>{
  api.get(`/getAll/balance/${Username}`,
    {
        Username :Username,
        Email:email
    }).then(res1 => this.setState({BalanceIng:res1.data[0]["suma"]})).catch(err => console.error(err)) 

},
getBalanceEg : (Username,email) =>{
   
    api.get(`/getAll/balanceEg/${Username}` ,{
      Username :Username,
      Email:email
  }).then(res1 => this.setState({BalanceEg:res1.data[0]["suma"]})).catch(err => console.error(err))
    

},

sendEmail :(name,userEmail,subject,message,email,Username)=>{api.post(`emailed/email`,
       {
           name:name,
           email:userEmail,
           subject:subject,
           message:message,
           Username :Username,
        Email:email
       })},
NewLog :(Concepto,Monto,Fecha,Tipo,Username,email)=>{api.post(`/add/${Username}`, {
    Concepto: Concepto,
    Monto: Monto,
    Fecha: Fecha,
    Tipo: Tipo,
    Username :Username,
    Email:email
  })},
last10:(Username,email)=>api.get(`/getAll/last10/${Username}`,{Username :Username,
    Email:email})
  .then((res) => this.setState({ register: res.data }))
  .catch((err) => console.error(err)),


  downloadRegister : (Username,email) => {
    api
      .get(`/get/${Username}`,{Username :Username,
        Email:email})
      .then((res) =>
        ConvertJSONToCsv(
          res.data,
          `Tabla de registros de ${Username}`
        )
      );
    alert("Los registros seran Descargados en su equipo");
  },

  getRegister : (Username,email) => {
    api
      .get(`/get/${Username}`,{Username :Username,
        Email:email})
      .then((res) => {
        this.setState({ register10: res.data });
      })

      .catch((err) => console.error(err))
  },
  UpdateLogByID:(Concepto,Monto,Fecha,id,Username,email)=>{
  const urlUpdate = `/update/${Username}/${id}`

  api.put(urlUpdate, {
    Concepto: Concepto,
    Monto: Monto,
    Fecha: Fecha,
    Username :Username,
    Email:email
  })},
  DeleteUserByID:(ID,Username,email)=>{
  const Delete = document.getElementById(ID).value;
    api.delete( `/delete/${Username}/${Delete}`,{Username :Username,
        Email:email})
        alert(
          "El registro " +
            Delete +
            " ha sido eliminado, Actualize para ver los registros"
        )},


 

}

export default routes