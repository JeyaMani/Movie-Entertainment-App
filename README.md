Movie-Entertainment-App
This is an example of how to connect the Eros Now API, which allows you to build apps that stream Bollywood content to the user. This app provides user with plenty of movie choices and they can be download and watch anywhere anytime.

Getting Started
You can use any code editor for this project. You will be having a HTML file and a JavaScript file.

Prerequisites
You need to Install npm for creating oath signature.
You also need sha1 to encrypt and decrypt the password.

Installing
Install with npm:
npm install oauth-signature

Install with bower:
bower install oauth-signature
Add a <script> to your index.html:
<script src="/bower_components/oauth-signature/dist/oauth-signature.js"></script>

Usage
To generate the OAuth signature call the following method:
oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, options)
* tokenSecret is optional
* options is optional
the default options parameter is as follows
var options = {
    encodeSignature: true // will encode the signature following the RFC 3986 Spec by default
}

Example
The following is an example on how to generate the signature for the reference sample as defined in
* http://oauth.net/core/1.0a/#rfc.section.A.5.1
* http://oauth.net/core/1.0a/#rfc.section.A.5.2
var httpMethod = 'GET',
    url = 'http://photos.example.net/photos',
    parameters = {
        oauth_consumer_key : 'dpf43f3p2l4k3l03',
        oauth_token : 'nnch734d00sl2jdk',
        oauth_nonce : 'kllo9940pd9333jh',
        oauth_timestamp : '1191242096',
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0',
        file : 'vacation.jpg',
        size : 'original'
    },
    consumerSecret = 'kd94hf93k423kf44',
    tokenSecret = 'pfkkdhi9sl3r4s00',
    // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
    encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret),
    // generates a BASE64 encode HMAC-SHA1 hash
    signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,
        { encodeSignature: false});
The encodedSignature variable will contain the RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash, ready to be used as a query parameter in a request: tR3%2BTy81lMeYAr%2FFid0kMTYa%2FWM%3D.
The signature variable will contain the BASE64 HMAC-SHA1 hash, without encoding: tR3+Ty81lMeYAr/Fid0kMTYa/WM=.

Running the tests
While you run this program, you need to give the valid user id and password to login and access the users profile and continue watching.
