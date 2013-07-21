var LocalStorageStore = function(successCallback, errorCallback) {
 //utilities
	var self=this;
	var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }
	this.parseJSON=function(str){
		return JSON.parse(str, function (key, value){
				var type;
				if (value && typeof value === 'object'){
					type = value.type;
					if (typeof type === 'string' && typeof window[type] === 'function'){
						return new (window[type])(value);
					}
				}
				return value;
			});
	}

//public methods
	this.downloadEvents=function(callback){
		var self=this;
		$.getJSON("http://www.jivinjari.com/?json=events/get_upcoming_events&callback=?",'',function(data){
			var em_events=self.parseJSON(data);
			window.localStorage.setItem("em_events", JSON.stringify(em_events));
			callLater(callback);		
		});
		
	};
    this.findByName = function(searchKey, callback) {
        var em_events = JSON.parse(window.localStorage.getItem("em_events"));
        var results = em_events.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, results);
    }
    this.findById = function(id, callback) {
        var em_events = JSON.parse(window.localStorage.getItem("em_events"));
        var j_event = null;
        var l = em_events.length;
        for (var i=0; i < l; i++) {
		

            if (em_events[i].event_id == id) {
		console.log("NAME:"+em_events[i].event_name);
		console.log("DESC:"+em_events[i].post_content);
		j_event = em_events[i];
                break;
            }
        }
        callLater(callback, j_event);
    }

	this.listAll = function(callback) {
		var em_events = JSON.parse(window.localStorage.getItem("em_events"));
        callLater(callback, em_events);
    }
	
	this.getRegisteredUser=function(callback){
	//window.localStorage.clear();
	var str=window.localStorage.getItem("user");
		if(str!=null){
			var user = self.parseJSON(str);
		}else{
			var user = null;
		}
		callLater(callback, user);
		
	}

	this.saveUser=function(data,callback){
		window.localStorage.setItem("user", JSON.stringify(data));
		callLater(callback);
	};    
	callLater(successCallback);

}