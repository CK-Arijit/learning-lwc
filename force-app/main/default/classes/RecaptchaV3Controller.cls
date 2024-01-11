public with sharing class RecaptchaV3Controller {
    public RecaptchaV3Controller() {

    }
    @AuraEnabled
    public static String isReCAPTCHAValid(String tokenFromClient) {
        String SECRET_KEY = '6LeoA0wpAAAAAHfAkf6mNDReGBtqsf0bIu9b7rQW';
        String RECAPTCHA_SERVICE_URL = 'https://www.google.com/recaptcha/api/siteverify';
        Http http = new Http();

        HttpRequest request = new HttpRequest();

        request.setEndpoint(RECAPTCHA_SERVICE_URL + '?secret=' + SECRET_KEY + '&response=' + tokenFromClient);
        request.setMethod('POST');
        request.setHeader('Content-Length', '0');
        HttpResponse response = http.send(request);

        

        Map<String, Object> mapOfBody = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());

        Boolean success = (Boolean) mapOfBody.get('success');
        Double captchaScore = (Double) mapOfBody.get('score');

        String responseData = JSON.serialize(new Map<String,Object>{'success' => success, 'captchaScore' => captchaScore});

        return responseData;
    }
}