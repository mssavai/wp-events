var MemoryStore = function(successCallback, errorCallback) {
	console.log( "In memory store" );
    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }
	var obj = this;
	this.getEvents=function(callback){
		$.getJSON("http://www.jivinjari.com/?json=events/get_upcoming_events&callback=?",'',function(data){
			obj.jivinjari_events=JSON.parse(data, function (key, value) {
				console.log( key+':'+value);
				var type;
				if (value && typeof value === 'object') {
					type = value.type;
					if (typeof type === 'string' && typeof window[type] === 'function') {
						return new (window[type])(value);
					}
				}
				return value;
			});
			console.log( "returned events is"+data);
		callLater(callback);		
		});
		
	};
	this.saveUser=function(user){
		obj.user_id=user.user_id;
		obj.user_name=user.first_name;
		obj.user_name=user.last_name;
		console.log( "memory:::saving user");
	};
    this.findByName = function(searchKey, callback) {
        var jivinjari_events = this.jivinjari_events.filter(function(element){
            var name = element.event_name;
            return name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, jivinjari_events);
    };    
    this.findCurrentEvents = function(callback) {
		//console.log('findCurrentEvents'+ this.jivinjari_events);
		
		        callLater(callback, this.jivinjari_events);

    };    
	this.listAll = function(callback) {
        callLater(callback, this.jivinjari_events);
    };

    this.findById = function(id, callback) {
        var jivinjari_events = this.jivinjari_events;
        var j_event = null;
        var l = jivinjari_events.length;
        for (var i=0; i < l; i++) {
		

            if (jivinjari_events[i].event_id == id) {
		console.log("NAME:"+jivinjari_events[i].event_name);
		console.log("DESC:"+jivinjari_events[i].post_content);
		j_event = jivinjari_events[i];
                break;
            }
        }
        callLater(callback, j_event);
    }

    callLater(successCallback);
}