import React from "react";
import remove from "../assets/remove.svg";
import settings from "../assets/settings.svg";
import favourite from "../assets/favourite.svg";

class Dropdown extends React.Component {
    render() {
        return (
            <div>
                <div className="dropdownMenu">
                    <div className="dropdownMenuItem" onClick={this.props.onEditEvent}>
                        <span className="iconHolder">
                            <img src={settings} alt="settings"/>
                        </span>
                        <span className="message">Edit</span>
                    </div>
                    <div className="dropdownMenuItem">
                        <span className="iconHolder">
                            <img src={favourite} alt="favourite"/>
                        </span>
                        <span className="message">Favourite</span>
                    </div>
                    <div className="dropdownMenuItem" onClick={this.props.onRemoveEvent}>
                        <span className="iconHolder">
                            <img src={remove} alt="remove"/>
                        </span>
                        <span className="message">Remove</span>
                    </div>
                </div>
            </div>
        )
    };
}

export default Dropdown;

