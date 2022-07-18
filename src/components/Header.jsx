import React from "react";
import settingsIcon from '../assets/settings.svg';
import avatar from '../assets/profile.png';
import plusIcon from '../assets/plus.svg';

class Header extends React.Component {
constructor() {
    super();
    this.onAddEvent = this.onAddEvent.bind(this);
}

onAddEvent() {
    this.props.onEditOrAddEvent("Add Contact");
}

render () {
    return (
        <div className="header">
            <div className="leftHeader">
                {/* <span className="iconHolder">
                    <img src={arrowIcon} alt="arrow"/>
                </span> */}
                <h1 className="headerContacts">Contacts</h1>
            </div>
            <div className="rightHeader">                
                <span className="iconHolder">
                    <img src={settingsIcon} alt="settings"/>
                </span>
                <span className="iconHolder">
                    <img src={avatar} alt="avatar"/>
                </span>
                <div className="button addButton" onClick={this.onAddEvent}>
                    <img src={plusIcon} alt="plus"/>
                    <h3>Add new</h3>
                </div>
                {/* <span className="iconHolder">
                    <img src={dimIcon} alt="dim"/>
                </span> */}
            </div>

        </div>
    )
}
}

export default Header;