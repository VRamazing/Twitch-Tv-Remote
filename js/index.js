
let app = angular.module("twitchApp",[]);
app.controller("twitchCtrl", function($scope,$http){
   const twitch = ["esl_sc2", "ogamingsc2", "cretetion", "freecodecamp", "storbeck", "habathcx", "robotcaleb", "noobs2ninjas"];
   
  $scope.loading = false;
   const url = "https://wind-bow.gomix.me/twitch-api";
   let json = { "image":"",
                "user":"",
                "stream": "Offline",
                "url": ""
   }
  
   $scope.jsonArr = [];
   $scope.status = 'all';
  
   $scope.myFilter = function(item){
        if($scope.status == 'all'){return item;} 
        else if($scope.status == 'online' && item.stream != "offline"){
            return item;
        }
        else if($scope.status == 'offline' && item.stream == "offline"){
            return item;
        }
       
    };
   
   twitch.forEach((elem,index) => {
        json = { "image":"",
                "user":"",
                "stream": "Offline",
                "url": ""}
          $.ajax({
              type: "GET",
              url: url + "/users/" + elem,
              dataType: 'jsonp',
              success: function(response){
                json = { "image":"",
                "user":"",
                "stream": "Offline",
                "url": "","name":""}
                json.image = response.logo;
                json.user = response.display_name;
                json.name =response.name;
                json.url = "https://www.twitch.tv/" + response.name;
                $scope.jsonArr.push(json);
                
             
          
              }
            }).done(function(){
                 var stream = "offline";
                 $.ajax({
                  type: "GET",
                  url: url + "/streams/" + elem,
                  dataType: 'jsonp',
                  async: false,
                  success: function(response) {

                    if(response.stream != null){
                      stream = response.stream.channel.game + " " + response.stream.channel.status;
                    }
                    
                   

                }
            }).done(function(){
              $scope.jsonArr.forEach(function(elemStr){
                if(elemStr.name == elem){
                  elemStr.stream = stream;
                }
              })   
            $scope.loading = true;
            $scope.$apply();
            })
                
               
            })
            
               
 });
            
           
  
  
  
});