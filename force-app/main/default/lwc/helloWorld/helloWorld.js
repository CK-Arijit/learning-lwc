import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {
    //properties
    fullName = "Zero to Hero"
    @track title = "Aura"

    changeHandler(event) {
        this.title = event.target.value;
    }

    address = {
        city: 'Melbourne',
        postCode: 3008,
        country: 'Australia'
    }

    trackHandler(event) {
        this.address = {...this.address, "city": event.target.value} //Spread operator
    }

    users = ["John", "Smith", "Ram"]
    num1 = 23
    num2= 3

    get firstUser() {
        return this.users[0]
    }

    get multiply() {
        return this.num1*this.num2
    }
}