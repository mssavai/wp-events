var UserView=function(store){
	var self = this;
	this.render = function(){
		this.el.html(UserView.signontemplate());
		return this;
	};
	this.validateUserLogin = function(){
		var username=$("#username").val();
		var password=$("#password").val();
		$.getJSON("http://localhost/simnew/?json=events/get_user_details&username="+username+"&password="+password+"&callback=?",function(data){
			user=self.parseJSON(data);
			console.log("returned user "+user);
			if(user.signedon){
				var userdata={"username":username,"password":password,"user_id":user.user_id,"first_name":user.first_name,"last_name":user.last_name};
				store.saveUser(userdata,function(){
				//redirect
				window.location.href="index.html";
				});
			}else{
				alert("invalid user credentials. "+user.login_error_message);
			}
		});
	};
	this.parseJSON=function(str){
		console.log( "login:::parsing "+str);
		return JSON.parse(str, function (key, value){
				console.log( key+" : "+value);
				var type;
				if (value && typeof value === 'object'){
					type = value.type;
					if (typeof type === 'string' && typeof window[type] === 'function'){
						return new (window[type])(value);
					}
				}
				return value;
			});
	};
    this.initialize = function(){
		this.el = $('<div/>');
		console.log('login view');
		this.el.on('click','.submitbutton',self.validateUserLogin);
    };
 
    this.initialize();
}
UserView.signontemplate = Handlebars.compile($("#login-tpl").html());

