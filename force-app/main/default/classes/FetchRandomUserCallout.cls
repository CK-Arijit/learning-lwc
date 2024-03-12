/**
 * @Company           : Cloudkaptan Consultancy Services Pvt. Ltd.
 * @description       : This is used to
 * @author            : Wasim Iqbal
 * @group             : 
 * @last modified on  : 01-10-2024
 * @last modified by  : Wasim Iqbal
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   01-10-2024   Wasim Iqbal   Initial Version
**/
public inherited sharing class FetchRandomUserCallout {
    
    /**
    * @description 
    * @author Wasim Iqbal | 01-10-2024 
    * @return String 
    **/
    @AuraEnabled
    public static String fetchDetails() {
        
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://randomuser.me/api');
            request.setMethod('GET');
            request.setHeader('Content-type', 'application/json');

            HttpResponse response = http.send(request);

            if(response.getStatusCode()!=200){
                throw new AuraHandledException('Request Failed Response Status: ' + response.getStatusCode());
            }
            return response.getBody();
        
        
    }
}