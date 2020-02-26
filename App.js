import React, { Component } from 'react';
import TableBills from './components/TableBills';
import './App.css';


class App extends Component {

    //billsPerPage = 10;

  constructor(props){
    super(props);

    this.state = {
      searchBill: '',
      data:[],
      showVetoedIssues: false
      //page: 0,
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

   handleVetoedButton = () => {
      const { showVetoedIssues } = this.state;
      showVetoedIssues ? this.setState({showVetoedIssues: false}) : this.setState({showVetoedIssues: true})      
   }

   handleClearButton = () => {
     this.setState({searchBill: ''})
   }
  
  render() {
    const {searchBill, data, showVetoedIssues} = this.state;
    const filteredSearchBill = searchBill.toUpperCase();
    let filteredBillsData = data.filter(bill => {
        return  (bill.date.includes(filteredSearchBill) 
                || bill.measureNumber.includes(filteredSearchBill) 
                || bill.signedOrVetoed.includes(filteredSearchBill)
                || bill.voterSupport.includes(filteredSearchBill)
                || bill.relatingToClause.includes(filteredSearchBill))          
    })
    // console.log(filteredBillsData); 
     let dynamicButton = showVetoedIssues ? "All" : "Only Vetoed";
     if(!showVetoedIssues) {
       let showAllVetoed = data.filter(billData => {
          if(billData.voterSupport >= 50 && billData.signedOrVetoed === "Vetoed") {
            return billData;
          } else {
            return null;
          }           
       });
          filteredBillsData = showAllVetoed;
     };
     
    return (
      <div className="App">    
        <center>
            <h1>Search for Oregon State Legislature Bills</h1> 
      </center>
              <label>Search: </label>
              <input type="text" value={this.state.searchBill}  onChange={this.onSearchChange} />
              <button onClick={this.handleClearButton}>Clear</button>           
      <div className="button" style={{textAlign: 'left'}}>
          <button onClick={this.handleVetoedButton} className="button-left">Show {dynamicButton} Bills</button>
      </div>          
        <TableBills data={filteredBillsData} />
    </div>  
    )
  }
}

export default App;
