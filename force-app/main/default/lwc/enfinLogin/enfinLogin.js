import { LightningElement } from "lwc";
import login from "@salesforce/apex/EnFinLoginController.login";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class EnfinLogin extends LightningElement {
  email;
  password;

  connectedCallback() {
    this.email = "";
    this.password = "";
  }

  handleInput(event) {
    if (event.target.name === "email") {
      this.email = event.target.value;
    } else if (event.target.name === "password") {
      this.password = event.target.value;
    }
  }

  showToast(title, message) {
    console.log("Hello");
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant: "error", // or 'error', 'warning', 'info'
    });
    this.dispatchEvent(event);
  }

  handleLogin(event) {
    let inputFieldInvalid = false;
    if (event.target.name !== "login") {
      return;
    }
    this.template.querySelectorAll("lightning-input").forEach((inputComp) => {
      if (!inputComp.reportValidity()) {
        inputFieldInvalid = true;
      }
    });
    if (inputFieldInvalid) {
      return;
    }

    login({
      requestData: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    })
      .then((data) => {
        if (data) {
          window.location.href = data;
        }
      })
      .catch((error) => {
        console.error(error.message);
        const {
          body: { message },
        } = error;
        this.showToast("Sign In Failed", message);
        console.error(error);
      });
  }
}
