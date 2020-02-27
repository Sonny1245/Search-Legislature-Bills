import React, { Component } from 'react';
import TableBills from './components/TableBills';
import './App.css';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      searchBill: '',
      data:[],
      showVetoedIssues: false
    }
  }

  fetchOregonBills = async() => {
      const response = await fetch(`https://pure-wave-91339.herokuapp.com/sample-data`);   
      const json = await response.json();
      //console.log(json);
      this.setState({ data: json });
  }

  componentDidMount() {
    this.fetchOregonBills()
  }

  onSearchChange = (e) => {
      this.setState({
      searchBill: e.target.value
    }) 
  }

  handleDynamicButton = () => {
      const { showVetoedIssues } = this.state; 
      this.setState({showVetoedIssues: !showVetoedIssues})
   }

  handleClearButton = () => {
     this.setState({searchBill: ''})
   }
  
  render() {
    const {searchBill, data, showVetoedIssues} = this.state;
    const caseSensitive = searchBill.toUpperCase();
    let filteredBillsData = data.filter(bill => {
        return  (bill.date.includes(caseSensitive) 
                || bill.measureNumber.includes(caseSensitive) 
                || bill.signedOrVetoed.includes(caseSensitive)
                || bill.voterSupport.includes(caseSensitive)
                || bill.relatingToClause.includes(caseSensitive))          
    })
      // console.log(filteredBillsData); 
      let dynamicButton = showVetoedIssues ? "All" : "Only Vetoed";

      if(!showVetoedIssues) {
        let filteredSignOrVetoed = data.filter(billData => {
            if(billData.voterSupport >= 50 && billData.signedOrVetoed === "Vetoed") {
              return billData;
          } else {
              return null;
          }           
    });
      //console.log('filteredSignOrVetoed',filteredSignOrVetoed);    
      let searchSignedOrVetoed =  filteredSignOrVetoed.filter(bill => {
            return bill.measureNumber.toLowerCase().includes(searchBill.toLowerCase());
         })
            filteredBillsData = searchSignedOrVetoed ;   
  }
           
  return (
  <div className="App">    
      <center>
            <h1>Search for Oregon State Legislature Bills</h1> 
      </center>
              <label>Search: </label>
              <input type="text" value={this.state.searchBill}  
              onChange={this.onSearchChange} />
              <button onClick={this.handleClearButton}>Clear</button>           
      <div className="button" style={{textAlign: 'left'}}>
              <button onClick={this.handleDynamicButton} className="button-left">
              Show {dynamicButton} Bills</button>
      </div>          
              <TableBills data={filteredBillsData} />
  </div>  
    )
  }
}

export default App;
