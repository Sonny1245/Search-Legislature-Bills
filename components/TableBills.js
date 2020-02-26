import React from 'react';

const TableBills = ({data}) => {

  return (
    <div className="App">
    <table>
    <thead>
      <tr>
          <th scope="col">Date</th>
          <th scope="col">Measure Number</th>
          <th scope="col">Signed Or Vetoed</th>
          <th scope="col">Voter Support</th>
          <th scope="col">Relate To Clause</th>
      </tr>
  </thead>
        <tbody>
          {             
            data.map((item,index) => {
              return(
              <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.measureNumber}</td>
                  <td> {item.signedOrVetoed}</td>
                  <td> {item.voterSupport}</td>
                  <td>{item.relatingToClause}</td>  
              </tr>       
            )})        
          }
        </tbody>
   </table>  
   <div>
   </div>           
    </div>
  )}
  
export default TableBills;