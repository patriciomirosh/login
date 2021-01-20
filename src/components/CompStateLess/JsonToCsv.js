export const ConvertJSONToCsv=(JSONData, fileName, ShowLabel)=> {
   

    if (fileName === null || fileName==='') {
           fileName = 'My export';
       }
   
       if (ShowLabel===null ||  ShowLabel==='') {
           ShowLabel = true;
       }
   
       var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
       let CSV = '"ID","Concepto","Monto","Fecha","Tipo", \r\n';
       if (ShowLabel) {}
       for (let i = 0; i < arrData.length; i++) {
           let row = "";
           for (let index in arrData[i]) {
               //var arrValue = arrData[i][index] === null ? "" : '="' + arrData[i][index] + '"';
               var arrValue = arrData[i][index] === null ? "" : '"' + arrData[i][index] + '"';
               row += arrValue + ',';
           }
           row.slice(0, row.length - 1);
          
           CSV +=row +'\r\n';
       }
       if (CSV === '') {
           alert("invalid data")
           return;
       }
   
    
           //Mozilla Firefox or Chrome
           var uri = 'data:application/csv;charset=utf-8,' + escape(CSV);
           var Link = document.createElement("a");
           Link.href = uri;
           Link.style = "visibility:hidden";
           Link.download = fileName + ".csv";
           document.body.appendChild(Link);
           Link.click();
           document.body.removeChild(Link);
       
   
   }
   
//this function is to desplegate of the burguer (navBar)
