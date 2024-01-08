public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        throw new AuraHandledException('Forced error');
        // return [
        //     SELECT firstName, lastName, Email
        //     FROM Contact
        // ];
    }
}