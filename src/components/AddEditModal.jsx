import React from "react";
import refresh from "../assets/refresh.svg";
import remove from "../assets/remove.svg";
import plus from "../assets/plus.svg";
import Input from "./Input";
import defaultPicture from "../assets/Default.png";
import axios from "axios";

class AddEditModal extends React.Component {  
    constructor() {
        super();
        this.state = {
            name: '',
            phone: '',
            picture: '',
            email: '',
        }
        this.onInputchange = this.onInputchange.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.uploadData = this.uploadData.bind(this);
    }

    componentDidMount() {
        let that = this;
        window.onclick = function(event) {
            const modal = document.querySelector(`#modal`); 
            if (event.target === modal) {
                modal.classList.remove("show");
                modal.classList.add("hide");
                that.props.hideModal();
            }
        }
    }

    setInput(contact) {
        if(contact) {
            this.setState({
                name: contact.name, 
                email: contact.email, 
                phone: contact.phone, 
                picture: contact.picture 
            });
        }
    }

    onInputchange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    openFileDialog() {
        document.getElementById('fileInput').click();
    }

    handleChangeImage = e => {
        this.setState({picture: URL.createObjectURL(e.target.files[0])})
    }

    removeImage() {
        this.setState({picture: ''});
    }

    async uploadData() {        
        await axios.post(
            'http://localhost:3001/upload', this.state
        ).then(resp => {
            this.props.hideModal();
        });
    }

    render() {
        let pictureComponent;
        if(this.state.picture) {
            pictureComponent = (
                <div className="editContactDetailsButtons">
                    <input id="fileInput" onChange={this.handleChangeImage} type="file" accept='image/*'/>
                    <img 
                        className="contactItemImage" 
                        src={this.state.picture} 
                        alt="profile"></img>
                    <div className="button changeButton" onClick={this.openFileDialog}>
                        <img src={refresh} alt="refresh"/>
                        <h3>Change picture</h3>
                    </div>
                    <span className="iconHolder" onClick={this.removeImage}>
                        <img src={remove} alt="remove"/>
                    </span>
                </div>);
        } else {
            pictureComponent = (
                <div className="editContactDetailsButtons">
                    <input id="fileInput" onChange={this.handleChangeImage} type="file" accept='image/*'/>
                    <img className="contactItemImage" src={defaultPicture} alt="profile"></img>
                    <div className="button changeButton" onClick={this.openFileDialog}>
                        <img src={plus} alt="plus"/>
                        <h3>Add picture</h3>
                    </div>
                </div>
            );
        }
        return (
            <div id="modal" className={this.props.show ? "show" : "hide"}>
                <div className="addEditModal" >
                    <h2 className="addEditModalTitle">{this.props.modalTitle}</h2>
                    <div className="editContactDetails">                        
                    {pictureComponent}
                        <div className="editModalInputs">
                            <Input 
                                onValueChange={this.onInputchange} 
                                name="name" 
                                val={this.state.name} 
                                label="Name"/>
                            <Input 
                                onValueChange={this.onInputchange} 
                                name="phone" 
                                val={this.state.phone} 
                                label="Phone number"/>
                            <Input 
                                onValueChange={this.onInputchange} 
                                name="email" 
                                val={this.state.email} 
                                label="Email address"/>
                        </div>
                        <div className="editModalButtons">
                            <div onClick={this.props.hideModal} className="button editModalButton cancelButton">
                                <h3>Cancel</h3>
                            </div>
                            <div className="button editModalButton" onClick={this.uploadData}>
                                <h3>Done</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddEditModal;