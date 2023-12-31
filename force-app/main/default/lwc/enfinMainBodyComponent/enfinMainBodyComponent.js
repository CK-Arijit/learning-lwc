import { LightningElement, track, wire } from "lwc";
import createEnfinRecord from "@salesforce/apex/EnfinCreateApp.createEnfinRecord";

export default class EnfinMainBodyComponent extends LightningElement {
  namePattern = "^[a-zA-Z ]+$";
  @track optionSelected = [];
  @track firstName = "";
  @track lastName = "";
  @track mobileNumber = "";
  @track email = "";
  @track primaryAddress = "";
  @track city = "";
  @track zipCode = "";
  @track state = "";
  @track loanAmount = "";
  @track loanTerm = "";
  @track unChecked = true;

  get disclosureOptions() {
    return [
      {
        label:
          "By checking the box, I/we, the applicant and the co-applicant (if applicable) have reviewed and agree to receive information electronically pursuant to the EnFin E-Sign disclosure.",
        value: "option1",
      },
    ];
  }

  handleDisclosureChange(e) {
    this.optionSelected = e.detail.value;
    if (this.optionSelected.length > 0) {
      this.unChecked = false;
    } else {
      this.unChecked = true;
    }
    console.log(this.unChecked);
  }

  @track options = [
    {
      label: "Alabama",
      value: "Alabama",
    },
    {
      label: "Alaska",
      value: "Alaska",
    },
    {
      label: "Arizona",
      value: "Arizona",
    },
    {
      label: "Arkansas",
      value: "Arkansas",
    },
    {
      label: "California",
      value: "California",
    },
    {
      label: "Colorado",
      value: "Colorado",
    },
    {
      label: "Connecticut",
      value: "Connecticut",
    },
    {
      label: "Delaware",
      value: "Delaware",
    },
    {
      label: "Florida",
      value: "Florida",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Hawaii",
      value: "Hawaii",
    },
    {
      label: "Idaho",
      value: "Idaho",
    },
    {
      label: "Utah",
      value: "Utah",
    },
    {
      label: "Wisconsin",
      value: "Wisconsin",
    },
    {
      label: "Puerto Rico",
      value: "Puerto Rico",
    },
    {
      label: "Texas",
      value: "Texas",
    },
  ];

  @track termOptions = [
    {
      label: "10 years",
      value: "10 years",
    },
    {
      label: "15 years",
      value: "15 years",
    },
    {
      label: "20 years",
      value: "20 years",
    },
    {
      label: "25 years",
      value: "25 years",
    },
  ];

  handleLoanTermChange(event) {
    this.loanTerm = event.detail.value;
  }

  handlePicklistChange(event) {
    this.state = event.detail.value;
    // You can perform additional actions based on the selected option here
  }

  handleFirstNameChange(event) {
    this.firstName = event.detail.value;
  }

  handleLastNameChange(event) {
    this.lastName = event.detail.value;
  }

  handleMobileNoChange(event) {
    this.mobileNumber = event.detail.value;
  }

  handleEmailChange(event) {
    this.email = event.detail.value;
  }

  handleAddressChange(event) {
    this.primaryAddress = event.detail.value;
  }

  handleCityChange(event) {
    this.city = event.detail.value;
  }

  handleZipCodeChange(event) {
    this.zipCode = event.detail.value;
  }

  handleLoanAmountChange(event) {
    this.loanAmount = event.detail.value;
  }

  saveButtonAction(event) {
    let inputFieldInvalid = false;
    this.template.querySelectorAll("lightning-input").forEach((inputComp) => {
      if (!inputComp.reportValidity()) {
        inputFieldInvalid = true;
      }
    });
    this.template
      .querySelectorAll("lightning-combobox")
      .forEach((inputComp) => {
        if (!inputComp.reportValidity()) {
          inputFieldInvalid = true;
        }
      });

    if (inputFieldInvalid) {
      return;
    }
    let myMap = [
      {
        firstName: this.firstName,
      },
      {
        lastName: this.lastName,
      },
      {
        mobileNumber: this.mobileNumber,
      },
      {
        email: this.email,
      },
      {
        primaryAddress: this.primaryAddress,
      },
      {
        city: this.city,
      },
      {
        state: this.state,
      },
      {
        zipCode: this.zipCode,
      },
      {
        loanAmount: this.loanAmount,
      },
      {
        loanTerm: this.loanTerm,
      },
    ];
    const data = JSON.stringify(myMap);
    console.log(data);
    createEnfinRecord({
      requestData: data,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}