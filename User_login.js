var g_email= '';
var g_password= '';

function login() {
    g_email= $("#user_name").val();
    g_password= SHA1($("#user_password").val());
    //alert("email=" + g_email + "; password=" + g_password);
    getResult(g_email, g_password);
}

function getResult(email, password) {
    var url= _config.loginUrl;
    var parameters= {
        email: email || g_email,
        password: password || g_password,
        type: 'force'
    };
    call_api("POST", url, parameters, function (data) {getUserProfile(data)});
}

function getUserProfile(data) {
    var creds= JSON.parse(data);
    var url= _config.profileUrl
    call_api("GET", url, {}, function (data) {renderProfile(data); getContent(data, creds)}, creds.token, creds.token_secret);
}

function renderProfile (data) {
    var profile= JSON.parse(data);
    $("#name").html(profile.name);
    $("#email").html(profile.email);
    $("#firstname").html(profile.firstname);
    $("#lastname").html(profile.lastname);
    $("#country").html(profile.country);
    $("#country_name").html(profile.country_name);
    $("#city").html(profile.city);
    $("#image").html(profile.image);
    alert("Welcome " + (profile.firstname) + "! ");
}

function getContent(data, creds) {
    var url=_config.progressUrl;
    call_api("GET", url, {}, function (data) {renderMovie(data)}, creds.token, creds.token_secret);
}

function renderMovie (data) {
    var json= JSON.parse(data);
    var movies= json.items;
    var movie_html= "<p id=\"jeya1\"><img src=\"__image_url__\" style=\"width:200px;height:100px;\"/><span id=\"items\"/></p> <br> <p id=\"jeya1\"><font color=\"red\" align=\"center\">Title: </font>__title__</p><p id=\"jeya1\"><font color=\"red\" align=\"center\">Duration: </font>__duration__</p><p id=\"jeya1\"><font color=\"red\" align=\"center\">Description: </font>__description__</p>";
    var html= '';
    for (i= 0; i < movies.length; i++) {
        var movie= movies[i];
        var section= movie_html;
        section= section.replace("__image_url__", movie.images["12"]);
        section= section.replace("__title__", movie.asset_title);
        section= section.replace("__duration__", movie.duration);
        section= section.replace("__description__", movie.description);
        html+= section;
    }
    $("#continue-watching").html(html);
 }

function message() {
    alert("You are loged out.");
}

function getDynamicPlaylist(){
    
    var parameters= {
        country: "US",
        content_type_id:1,
        d_playlists:'d-carousal',
        content_type_id:1,
        page:1,
        format:'generic',
        language_rank:1,
        playlistorder: 'serverside'
    };
    
    var url=_config.playlistUrl;
    call_api("GET", url, parameters, function (data) {
        data = JSON.parse(data);
        
        var data = data['d-carousal'][1][0].data;
        
        var templet = '', activeClass = '';
             
       for(var i=0; i < data.length;i++){
           if(i==0){
               activeClass = 'active';
           }else{
               activeClass = '';
           }
           templet = templet + '<div class="item '+ activeClass +'"><img src="'+ data[i].images[9] + '" style="width:1000px;height:500px;"><div class="carousel-caption"></div></div>'
       }      
         templet = templet + '<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#myCarousel" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>'
        $("#carousel_Main").html(templet);       
    });    
}

$( document ).ready(function() {
    getDynamicPlaylist();
});

function call_api(method, url, parameters, next_function, token_key, token_secret) {
    var consumer_key= _config.consumer_key;
    var consumer_secret= _config.consumer_secret;
    var nonce= Math.floor(Math.random()*9000000 + 1000000);
    var signature_method= 'HMAC-SHA1';
    var timestamp= Math.round((new Date()).getTime() / 1000);
    var version= '1.0';
    var data= {
        oauth_consumer_key: consumer_key,
        oauth_signature_method: signature_method,
        oauth_timestamp: timestamp.toString(),
        oauth_nonce: nonce.toString(),
        oauth_version: version
    };
    if(token_key) {
        data.oauth_token= token_key;
    }
    for (var key in parameters) {
        data[key]= parameters[key];
    }
    data.oauth_signature= oauthSignature.generate(method, url, data, consumer_secret, token_secret);
    for (var key in parameters) {
        data[key]= encodeURIComponent(data[key]);
    }
    
    var oauth_bits= [];
    var keys= Object.keys(data);
    keys.sort();
    console.log(keys)
    for (var a= 0; a < keys.length; a++) {
        oauth_bits.push(keys[a] + "=\"" + data[keys[a]] + "\"");
    }
    var authorization= "OAuth " + oauth_bits.join(",");
    
    console.log(authorization)
      
    $.ajax({
        method: method,
        url: url,
        data: parameters,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        headers: {
            Authorization: authorization,
            Accept: "application/json"
        },
        success : function(data) {
            //Success block
            next_function(data);
        },
        error: function (xhr,ajaxOptions,throwError){
            //Error block
            console.log("error");
        }
    });    
}



