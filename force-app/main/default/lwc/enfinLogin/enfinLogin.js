import { LightningElement, track, api } from "lwc";
import login from "@salesforce/apex/EnFinLoginController.login";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import pageUrl from '@salesforce/resourceUrl/recaptchaV3';
import isReCAPTCHAValid from '@salesforce/apex/RecaptchaV3Controller.isReCAPTCHAValid'

export default class EnfinLogin extends LightningElement {
  email;
  password;
  @track showLoader = false;

  @api formToken;
  @api validReCAPTCHA = false;

  @track navigateTo;
  captchaWindow = null;

  constructor(){
    super();
    this.navigateTo = pageUrl;
  }

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
    this.showLoader = true;
    login({
      requestData: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    })
      .then((data) => {
        this.showLoader = false;
        if (data) {
          window.location.href = data;
        }
      })
      .catch((error) => {
        this.showLoader = false;
        const {
          body: { message },
        } = error;
        this.showToast("Sign In Failed", message);
        console.error(error);
      });
  }

  captchaLoaded(evt){
    var e = evt;
    let captchaScore;
    let captchaResult;
    let commUrl = 'https://cloudkaptan88-dev-ed.develop.my.site.com';
    commUrl = commUrl + pageUrl;
    console.log(e.target.getAttribute('src') + ' loaded');
    console.log('Hello HELLO HI');
    console.log(e);
    console.log('Arijit '+ commUrl);
    if(e.target.getAttribute('src') == commUrl){
      console.log('Hello World');
        window.addEventListener("message", function(e) {
            if (e.data.action == "getCAPCAH" && e.data.callCAPTCHAResponse == "NOK"){
                console.log("Token not obtained!")
            } else if (e.data.action == "getCAPCAH" ) {
                this.formToken = e.data.callCAPTCHAResponse;
                console.log('FORM TOKEN '+ this.formToken);
                result = isReCAPTCHAValid({tokenFromClient: formToken}).then(data => {
                  console.log(data);
                  let parseData = JSON.parse(data);
                  console.log(parseData);
                  captchaResult = parseData.success;
                  console.log('CAPTCHA SUCCESS ' + captchaResult);
                  captchaScore = parseData.captchaScore;
                  console.log('CAPTCHA SCORE ' + captchaScore);
                  this.validReCAPTCHA = captchaResult;
                })

                // isReCAPTCHAValid({tokenFromClient: formToken}).then(data => {
                //     this.validReCAPTCHA = data;
                // });
            }
        }, false);
    } 
    else {
      console.log('BYE BYE');
    }
  }

}
