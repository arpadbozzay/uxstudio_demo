import React from "react";
import bell from "../assets/bell.svg"
import headphone from "../assets/headphone.svg"
import more from "../assets/more.svg"
import Dropdown from "./Dropdown";
 
class ContactiItem extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            phone: '',
            picture: '',
            email: '',
            showModal: false
        }

        this.onEditEvent = this.onEditEvent.bind(this);
        this.onRemoveEvent = this.onRemoveEvent.bind(this);
    }

    componentDidMount() {
        if(this.props) {;
            this.setState({
                name: this.props.name,
                phone: this.props.phone,
                picture: this.props.picture,
                email: this.props.email
            });
        }
    }

    onEditEvent(event) {
        this.props.onEditEvent(this.state);
    }

    onRemoveEvent(event) {
        this.props.onRemoveEvent(this.state.name);
    }

    render() {
        return (
            <div className="contactItemHolder">
                <div className="contactItemLeft">    
                    <img className="contactItemImage" src={this.state.picture} alt="profile"></img>
                    <div className="contactItemDetails">
                        <h3>{this.state.name}</h3>
                        <span className="message">{this.state.phone}</span>
                    </div>
                </div>
                <div className="contactItemRight">    
                <span className="iconHolder">
                    <img src={bell} alt="bell"/>
                </span>
                <span className="iconHolder">
                    <img src={headphone} alt="headphone"/>
                </span>
                <span className="iconHolder moreIcon">
                    <img src={more} alt="more"/>
                    <Dropdown 
                        onRemoveEvent={this.onRemoveEvent} 
                        onEditEvent={this.onEditEvent}/>
                </span>
                </div>
            </div>
        );
    }
}

export default ContactiItem;