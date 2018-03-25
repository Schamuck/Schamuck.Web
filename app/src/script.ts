

export class script
{
   constructor() 
   {
      let root =  document.getElementById("root");
      let table = document.createElement("table");

      table.setAttribute("class","table");  

         var header = table.createTHead();

         let th = document.createElement('th');
         th.innerHTML = "FirstName";
         header.appendChild(th); 
         let th2 = document.createElement('th');
         th2.innerHTML = "Last Name";
         header.appendChild(th2); 
         let th3 = document.createElement('th');
         th3.innerHTML = "Email Address";
         header.appendChild(th3); 

        let body = table.createTBody();
        let row = table.insertRow(0);
        let  cell1 = row.insertCell(0);
        let  cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerHTML = "Rokon";
        cell2.innerHTML = "Jaman";
        cell3.innerHTML = "rokon.m.jaman@gmail.com";
        body.appendChild(row);

        root.appendChild(table);   
   }
}