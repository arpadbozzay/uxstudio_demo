import React from "react";

class Input extends React.Component {
    constructor() {
        super();
        this.onInputchange = this.onInputchange.bind(this);
    }

    onInputchange(event) {
        this.props.onValueChange(event);
      }

    render() {
        return (
            <div className="inputWrapper">
                <span className="message inputLabel">{this.props.label}</span>
                <input name={this.props.name} onChange={this.onInputchange} value={this.props.val} className="inputField"></input>
            </div>
        )
    }   
}

export default Input; 