global without sharing class EnfinCreateApp {
    @AuraEnabled
    public static Boolean createEnfinRecord(String requestData) {
        String firstName;
        String lastName;
        String mobileNumber;
        String email;
        String primaryAddress;
        String city;
        String state;
        String zipCode;
        Double loanAmount;
        Integer loanTerm;

        Map<String, Object> applicationData = (Map<String, Object>) JSON.deserializeUntyped(requestData);

        firstName = String.valueOf(applicationData.get('firstName'));
        lastName = String.valueOf(applicationData.get('lastName'));
        mobileNumber = String.valueOf(applicationData.get('mobileNumber'));
        email = String.valueOf(applicationData.get('email'));
        primaryAddress = String.valueOf(applicationData.get('primaryAddress'));
        city = String.valueOf(applicationData.get('city'));
        state = String.valueOf(applicationData.get('state'));
        zipCode = String.valueOf(applicationData.get('zipCode'));
        loanAmount = Double.valueOf(String.valueOf(applicationData.get('loanAmount')));
        loanTerm = Integer.valueOf(String.valueOf(applicationData.get('loanTerm')));

        
        //Insert account
        Account acc = new Account();
        acc.name = firstName + ' ' + lastName;
        acc.phone = mobileNumber;
        acc.BillingStreet = primaryAddress;
        acc.BillingCity = city;
        acc.BillingPostalCode = zipCode;
        acc.billingState = state;
        insert acc;

        //Insert Contact
        Contact con = new Contact();
        con.firstName = firstName;
        con.lastName = lastName;
        con.email = email;
        con.accountId = acc.id;
        insert con;

        //Insert Contract
        Contract contract = new Contract();
        contract.AccountId = acc.id;
        contract.ContractTerm = loanTerm;
        contract.loan_amount__c = loanAmount;
        insert contract;

        return true;
    }
}