var LoginView=function(store){
	var obj=this;
	this.user;
	this.checkSignOn=function(){
		checksignonobj=this;
		$.getJSON("http://www.jivinjari.com/?json=events/checksignon&callback=?",'',function (data){
			checksignonobj.user=parseJSON(data);
		});
		return validateUserLogin();
	}
	this.render = function(){
		this.el.html(HomeView.logintemplate());
		return this;
	};
	this.validateUserLogin = function(data){
		console.log( "login:::validating...");
		user=JSON.parse(data);
		if(user){
			//store.user_name=user;
			store.user_id= user.user_id;
		//}else{
		//	return false;
		}
	};
	this.parseJSON=function(data){
		console.log( "login:::parsing");
		return JSON.parse(data);
		
		
	};
    this.initialize = function(){
		this.el = $('<div/>');
		console.log('login view');
		this.el.on('click','.submitbutton',function(){
			console.log( "login:::click submit");
			var form = $("#login-form"); 
			var u = $(".username", form).val();
			var p = $(".password", form).val();	
			$.ajax({
				type: 'POST',
				url:"http://www.jivinjari.com/?json=events/signon",
				data:{log:u,pwd:p},
				dataType: "json",
				async:true,
				contentType: "application/json; charset=utf-8",
				error: function (xhr){ 
						var err=eval("("+xhr.responseText+")");
						console.log( "login:::error"+err.Message);
					},	
				success: function (xhr){ 
						//var err=eval("("+xhr.responseText+")");
						//console.log( "login:::error"+err.Message);
					},
				complete:function(data){
					console.log( "login:::click submit callback");	
					console.log( "login:::validating..." + data);
	
					console.log( "login:::storing  user..." + user);
					if(user){
						console.log( "login:::storing  user...");
					}else{
						console.log( "login:::failed");
					}
				}
			});			
			
		});
    };
 
    this.initialize();
HomeView.logintemplate = Handlebars.compile($("#login-tpl").html());
}
