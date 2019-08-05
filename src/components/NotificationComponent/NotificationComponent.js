import React from "react"
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import "./NotificationComponent.css"

class NotificationComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            notifications: [],
            defaultColor: "default-color",
            warningColor: "warn-color"
        }
    }

    clickHandler = event => {
        event.preventDefault();
    }

    render(){

        let color = this.state.notifications.length > 0 ?
            this.state.warningColor :
            this.state.warningColor;

        return(
            <MDBDropdown dropleft>
            <MDBDropdownToggle caret
            color="warn-color"
            size="sm"
            >
              Notifications
            </MDBDropdownToggle>
            <MDBDropdownMenu basic>
              <MDBDropdownItem>Action</MDBDropdownItem>
              <MDBDropdownItem>Another Action</MDBDropdownItem>
              <MDBDropdownItem>Something else here</MDBDropdownItem>
              <MDBDropdownItem divider />
              <MDBDropdownItem>Separated link</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        );
    }

}

export default NotificationComponent;