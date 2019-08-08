import React from "react";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import "./NotificationComponent.css";
import axios from "axios";
import { jsxFragment } from "@babel/types";

class NotificationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      defaultColor: "light-blue",
      warningColor: "amber",
      config: {
        headers: {
          Authorization: "Bearer " + this.props.authInfo.authToken
        }
      }
    };
  }

  clickHandler = id => {
    axios
      .put(
        "http://localhost:8080/api/notifications/see/" + id,
        null,
        this.state.config
      )
      .then(response => {
        this.updateNotifications();
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  updateNotifications = () => {
    axios
      .get("http://localhost:8080/api/notifications/unseen", this.state.config)
      .then(response => {
        this.setState({ notifications: response.data });
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
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
        notificationsText = "(1) NEW Notification!";
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
          <MDBDropdownItem>
            <b>Notifications</b>
          </MDBDropdownItem>
          <hr />
          {this.state.notifications.map((notification, i) => {
            return (
              <React.Fragment>
                <MDBDropdownItem
                  style={{ whiteSpace: "normal" }}
                  onClick={() => this.clickHandler(notification.id)}
                  key={notification.id}
                >
                  {notification.message}
                </MDBDropdownItem>
                <hr />
              </React.Fragment>
            );
          })}
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }
}

export default NotificationComponent;
