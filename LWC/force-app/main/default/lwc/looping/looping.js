import { LightningElement } from 'lwc';

export default class Looping extends LightningElement {
    carList = ["Ford", "Audi", "Maruti", "Volkswagen", "Hyundai", "Mercedes"]
    ceoList = [
        {
          id: 1,
          company: "Google",
          name: "Sundar Pichai"
        },
        {
          id: 2,
          company: "Apple Inc.",
          name: "Tim cook"
        },
        {
          id: 3,
          company: "Facebook",
          name: "Mark Zuckerberg"
        },
        {
          id: 4,
          company: "Amazon.com",
          name: "Jeff Bezos"
        },
        {
          id: 5,
          company: "Capgemini",
          name: "Paul Hermelin"
        }
      ];
}