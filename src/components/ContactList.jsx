import React from "react";
import ContactiItem from "./ContactItem";
import axios from "axios";

class ContactiList extends React.Component {
    constructor() {
        super();
        this.state = {
            isDataDownloaded: false,
            contacts: []
        };

        this.onEditEvent = this.onEditEvent.bind(this);
        this.onRemoveEvent = this.onRemoveEvent.bind(this);
    }

    onEditEvent(element) {
        this.props.onEditOrAddEvent("Edit Contact", element);
    }

    async onRemoveEvent(name) {
        await axios.delete(
            `http://localhost:3001/delete/${name}`
        ).then(response => {});
        await this.download();
    }

    async download() {  
        const results = [];     
        await axios.get(
            'http://localhost:3001/download'
        ).then(response => {
            response.data.data.forEach(e => {
                results.push(e);
            })
        this.setState({contacts: results});
        });
    }
    
    async componentDidMount() {
        await this.download();
    }

    render() {
        return (
            <div>
                {this.state.contacts.map((elem) => (
                    <ContactiItem
                        key={elem.name}
                        name={elem.name}
                        phone={elem.phone}
                        email={elem.email}
                        picture={elem.picture}
                        onEditEvent={this.onEditEvent}
                        onRemoveEvent={this.onRemoveEvent}
                    ></ContactiItem>
                    ))}
            </div>
        );
    }
}

export default ContactiList;