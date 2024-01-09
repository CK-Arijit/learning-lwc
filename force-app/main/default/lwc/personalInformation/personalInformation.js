import { LightningElement, track } from 'lwc';

export default class PersonalInformation extends LightningElement {
    @track formattedPhoneNumber = '';
    @track driversLicense = '';
    @track selectedValue = '';
    @track selectedOption = '';
    @track medicareNumber = '';
    @track driverLicenseCheck = false;
    @track medicareNumberCheck = false;


    handlePhoneNumberChange(event) {
        let inputPhoneNumber = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters

        if (inputPhoneNumber.length <= 10) {
            // Format as (XXX) XXX-XXXX
            this.formattedPhoneNumber = inputPhoneNumber.replace(
                /(\d{3})(\d{3})(\d{4})/,
                '($1) $2-$3'
            );
        } else {
            // Handle longer phone numbers as needed
            this.formattedPhoneNumber = inputPhoneNumber;
        }
    }

    handleLicenseChange(event) {
        this.driversLicense = event.target.value.toUpperCase(); // Convert to uppercase if needed
    }

    handleMedicareChange(event) {
        this.medicareNumber = event.target.value.toUpperCase();
    }

    get options() {
        return [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Others', value: 'Others' },
            // Add more options as needed
        ];
    }

    handlePicklistChange(event) {
        this.selectedValue = event.detail.value;
        // You can perform additional actions based on the selected value
    }

    get identificationOptions() {
        return [
            { label: 'Driver License', value: 'Driver License' },
            { label: 'Medicare Number', value: 'Medicare Number' },
        ];
    }

    handleRadioChange(event) {
        this.selectedOption = event.detail.value;
        if(this.selectedOption === "Driver License") {
            this.driverLicenseCheck = true;
            this.medicareNumberCheck = false;
        }
        else if(this.selectedOption === "Medicare Number") {
            this.medicareNumberCheck = true;
            this.driverLicenseCheck = false;
        }
        // You can perform additional actions based on the selected option
    }
    
}