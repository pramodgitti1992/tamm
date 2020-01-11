import React from 'react';
import './InputField.css';

class InputField extends React.Component {
    constructor(props){
        super(props)

    }

    render(){
        return (
            <div className="inputfield">
                <form className="form-container">
                    <label>{this.props.label}</label><br></br>
                    <input className="input-field" type={this.props.inputType} onBlur={this.checkLength} onChange={this.getInput}></input>
                </form>
            </div>
          );
    }

    getInput = (e) =>{
        const inputVal = e.target.value;
        this.props.getName(inputVal, this.props.fieldName);
    }

    checkLength = (e) => {
        const length = e.target.value.length;
        if (this.props.fieldName === 'card') {
            if (length < 10 || length > 10) {
                this.props.getCardNum(false, 'Should be 10 digits');
            } else if (length === 10) {
                this.props.getCardNum(true);
            }
        }
        if (this.props.fieldName === 'limit') {
            const val = parseInt(e.target.value);
            if (val >= 0) {
                this.props.checkLimit(true);
            } else if (val < 0) {
                this.props.checkLimit(false, 'Limit cannot be below 0');
            }
        }
    } 

}





export default InputField;
