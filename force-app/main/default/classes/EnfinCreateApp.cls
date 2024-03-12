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

        Id userId;

        userId = UserInfo.getUserId();

        List<User> userList = [SELECT id, name, AccountId, ContactId from User where id =: userId];

        if(userList == null || userList.size() == 0) {
            throw new AuraHandledException('The user is not yet authenticated.');
        }

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

        
        //Update account
        Account acc = new Account();
        acc.id = userList[0].AccountId;
        acc.name = firstName + ' ' + lastName;
        acc.phone = mobileNumber;
        acc.BillingStreet = primaryAddress;
        acc.BillingCity = city;
        acc.BillingPostalCode = zipCode;
        acc.billingState = state;
        update acc;

        //Insert Contact
        Contact con = new Contact();
        con.id = userList[0].ContactId;
        con.firstName = firstName;
        con.lastName = lastName;
        con.email = email;
        con.accountId = acc.id;
        update con;

        //Insert or update Contract
        List<Contract> contractList = [SELECT id, AccountId from Contract WHERE AccountId =: userList[0].AccountId];
        Contract contract = new Contract();
        if(contractList != null && contractList.size() > 0) {
            contract.id = contractList[0].id;
        }
        contract.AccountId = userList[0].AccountId;
        contract.ContractTerm = loanTerm;
        contract.loan_amount__c = loanAmount;
        upsert contract;

        return true;
    }
}