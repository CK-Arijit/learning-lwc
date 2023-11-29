import { LightningElement } from 'lwc';
import signinTemplate from './signinTemplate.html';
import signupTemplate from './signupTemplate.html';
import renderTemplete from './renderMethod.html';
export default class RenderMethod extends LightningElement {
    selectedButton = ""
    render() {
        return this.selectedButton === 'Sign Up' ? signupTemplate : this.selectedButton === 'Sign In' ? signinTemplate : renderTemplete
    }

    handleClick(event) {
        this.selectedButton = event.target.label
    }
 }