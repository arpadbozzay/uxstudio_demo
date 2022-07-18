import React from "react";
import Header from "./Header";
import ContactList from "./ContactList";
import AddEditModal from "./AddEditModal";

class MainComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            modalTitle: ''
        };
        this.modal = React.createRef();
        this.contactList = React.createRef();
        this.hideModal = this.hideModal.bind(this);
        this.onEditOrAddEvent = this.onEditOrAddEvent.bind(this);
    }

    hideModal() {
        this.setState({showModal: false});
        this.contactList.current.download();
    }

    onEditOrAddEvent(title, details) {
        if (title === "Edit Contact" && details) {
            this.modal.current.setInput(details);
        } else {
            this.modal.current.setInput({name: "", picture: "", phone: "", email: ""});
        } 
        this.setState({showModal: true, modalTitle: title});
    }
    
    render() {
        return (
            <div className="main">
                <Header onEditOrAddEvent={this.onEditOrAddEvent}/>
                <ContactList ref={this.contactList} onEditOrAddEvent={this.onEditOrAddEvent}/>
                <AddEditModal
                    hideModal={this.hideModal} 
                    modalTitle={this.state.modalTitle} 
                    show={this.state.showModal}
                    ref={this.modal}
                    />
            </div>
        );
    }

}

export default MainComponent;