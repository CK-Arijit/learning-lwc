/**
 * @Company           : Cloudkaptan Consultancy Services Pvt. Ltd.
 * @description       : This is used to
 * @author            : Wasim Iqbal
 * @group             : 
 * @last modified on  : 01-08-2024
 * @last modified by  : Wasim Iqbal
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   01-08-2024   Wasim Iqbal   Initial Version
**/
global without sharing class EnFinLoginController {
   @AuraEnabled
   global static string login(String requestData) {
    try {
        Map<String,String> loginCredMap = (Map<String,String>)JSON.deserialize(requestData, Map<String,String>.class);  
        ApexPages.PageReference pageRef = Site.login(loginCredMap.get('email'),
                                            loginCredMap.get('password'),
                                            'cloudkaptan88-dev-ed.develop.my.site.com/testing'
                                        );

    return pageRef.getUrl();
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}