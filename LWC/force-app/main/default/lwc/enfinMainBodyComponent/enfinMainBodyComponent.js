import { LightningElement, track } from 'lwc';

export default class EnfinMainBodyComponent extends LightningElement {
    @track optionSelected = [];
    @track firstName = '';
    @track lastName = '';
    @track mobileNumber = '';
    @track email = '';
    @track primaryAddress = '';
    @track city = '';
    @track zipCode = '';
    @track state = '';

    @track isChecked = false;

    get disclosureOptions() {
        return [
            { label: 'By checking the box, I/we, the applicant and the co-applicant (if applicable) have reviewed and agree to receive information electronically pursuant to the EnFin E-Sign disclosure.', value: 'option1' },
        ];
    }


    handleDisclosureChange(e) {
        this.optionSelected = e.detail.value;
        if(this.optionSelected.length > 0) {
            this.isChecked = true;
        }
        else {
            this.isChecked = false;
        }
        console.log(this.isChecked);
    }

    @track options = [
        { label: 'Alabama', value: 'Alabama' },
        { label: 'Alaska', value: 'Alaska' },
        { label: 'Arizona', value: 'Arizona' },
        { label: 'Arkansas', value: 'Arkansas' },
        { label: 'California', value: 'California' },
        { label: 'Colorado', value: 'Colorado' },
        { label: 'Connecticut', value: 'Connecticut' },
        { label: 'Delaware', value: 'Delaware' },
        { label: 'Florida', value: 'Florida' },
        { label: 'Georgia', value: 'Georgia' },
        { label: 'Hawaii', value: 'Hawaii' },
        { label: 'Idaho', value: 'Idaho' },
        { label: 'Utah', value: 'Utah' },
        { label: 'Wisconsin', value: 'Wisconsin' },
        { label: 'Puerto Rico', value: 'Puerto Rico' },
        { label: 'Texas', value: 'Texas' },
    ];


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
}