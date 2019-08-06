import React from "react";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import "./NotificationComponent.css";
import axios from "axios";

class NotificationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      defaultColor: "light-blue",
      warningColor: "amber"
    };
  }

  clickHandler = event => {
    event.preventDefault();
  };

  updateNotifications = () => {
    let newNotifications = [];

    axios
      .get(
        "http://localhost:8080/api/notifications/unseen/" + this.props.userId
      )
      .then(response => {
        console.log(response);
      });
  };

  componentDidMount() {
    this.updateNotifications();
  }

  render() {
    let color =
      this.state.notifications.length === 0
        ? this.state.defaultColor
        : this.state.warningColor;

    let notificationsText;
    switch (this.state.notifications.length) {
      case 0:
        notificationsText = "No Notifications";
        break;
      case 1:
        notificationsText = "(1) NEW Notification";
        break;
      default:
        notificationsText =
          "(" + this.state.notifications.length + ") NEW Notifications!";
    }

    return (
      <MDBDropdown dropleft>
        <MDBDropdownToggle color={color} size="sm">
          {notificationsText}
        </MDBDropdownToggle>
        <MDBDropdownMenu basic>
          <MDBDropdownItem>Action</MDBDropdownItem>
          <MDBDropdownItem>Another Action</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }
}

export default NotificationComponent;
