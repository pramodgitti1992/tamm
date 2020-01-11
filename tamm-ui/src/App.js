import React from 'react';
import logo from './logo.svg';
import './App.css';
import InputField from './components/inputField/InputField';
import Table from './components/table/Table';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tableObj: {
        name: '',
        card: '',
        limit: '',
      },
      tableData: [],
      notValid: false,
      isCardValid: false,
      cardValidationMsg: '',
      validCardAlert: false,
      isValidLimit: false,
      limitValidationMsg: ''
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Credit Card System</h1>
        <h2>Add</h2>
        {this.state.notValid ? <div className="error-msg">Please enter valid inputs<span className="cancel-icon" onClick={this.removeErrorMsg}>x</span></div> : ''}
        <InputField className="inputfield" label="Name" fieldName="name" getName={this.getData} inputType="text" />
        {this.state.isCardValid ? <div className="err-msg">{this.state.cardValidationMsg}</div> : ''}
        {this.state.validCardAlert ? <div className="err-msg">Please enter valid card number</div> : ''}
        <InputField className="inputfield" label="Card Number" fieldName="card" getName={this.getData} inputType="number" getCardNum={this.getCardInfo} maxLength={10}/>
        {this.state.isValidLimit ? <div className="err-msg">{this.state.limitValidationMsg}</div> : ''}
        <InputField className="inputfield" label="Limit" fieldName="limit" checkLimit={this.getLimitInfo}  getName={this.getData} inputType="number" />
        <div className="add-btn" onClick={this.addCreditCard}>Add</div>

        <h2>Existing Credit Cards</h2>
        <Table data={this.state.tableData}/>

      </div>
    );
  }

  getLimitInfo = (limitStatus, msg) => {
    this.setState({
      isValidLimit: !limitStatus,
      limitValidationMsg: msg
    })
  }

  getCardInfo = (cardStatus, msg) => {
    this.setState({
      isCardValid: !cardStatus,
      cardValidationMsg: msg,
      validCardAlert: !cardStatus
    });
  }

  getData = (fieldVal, fieldName) => {
    if (fieldName === 'name') {
      this.setState({
        tableObj: {
          name: fieldVal,
          card: this.state.tableObj.card,
          limit: this.state.tableObj.limit
        }
      })
    }
    if (fieldName === 'card') {
      this.setState({
        tableObj: {
          name: this.state.tableObj.name,
          card: fieldVal,
          limit: this.state.tableObj.limit
        }
      })
    }
    if (fieldName === 'limit') {
      this.setState({
        tableObj: {
          name: this.state.tableObj.name,
          card: this.state.tableObj.card,
          limit: fieldVal
        }
      })
    }
  }

  addCreditCard = () => {

    if (this.state.tableObj.name === '' || this.state.tableObj.card === '' || this.state.tableObj.limit === '') {
      this.setState({
        notValid: true
      });
    } else {
      const isValid = this.isCardValid(this.state.tableObj.card);
      if (isValid && !this.state.isValidLimit) {
        axios.post('http://localhost:8080/addCreditCard', this.state.tableObj).then(data => {
          this.setState({
            tableData: data.data
          })
        });
      } else {
        this.setState({
          validCardAlert: true
        })
      }
    }
  }

  // Takes a credit card string value and returns true on valid number
  isCardValid = (value) => {
    // Accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
      var cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);

      if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

      nCheck += nDigit;
      bEven = !bEven;
    }

    return (nCheck % 10) == 0;
  }

  removeErrorMsg = () => {
    this.setState({
      notValid: false
    });
  }

}

export default App;
