var HomeView = function(store) {
	this.getEvents=function(){
		store.getEvents(function(){
			$('.btngetevents').trigger('custom');
			console.log('trigger eventsloaded');
		});
	};
	this.render = function(reloadEvents) {
		if(!reloadEvents){
			this.el.html(HomeView.template());
			this.getEvents();
		}else{
			this.el.html(HomeView.template());
			this.findCurrentEvents();
		}
		return this;
	};
	this.findByName = function() {
		store.findByName($('.search-key').val(), function(em_events) {
			$('.em_events-list').html(HomeView.liTemplate(em_events));
			if (self.iscroll) {
				console.log('Refresh iScroll');
				self.iscroll.refresh();
			} else {
				console.log('New iScroll');
				self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
			}
		});
	};

	this.findCurrentEvents = function(){			
		console.log('executing Homeview.findCurrentEvents');
		store.findCurrentEvents(function(em_events) {
			$('.current_events-list').html(HomeView.liTemplate(em_events));
			if (self.iscroll) {
				console.log('Refresh iScroll');
				self.iscroll.refresh();
			} else {
				console.log('New iScroll');
				self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
			}
		});
	};

     this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
        this.el.on('custom','.btngetevents',this.findCurrentEvents);
        this.el.on('click','.btngetevents',this.findCurrentEvents);
		console.log('register event eventsloaded');
    };
 
    this.initialize();
 
}
HomeView.template = Handlebars.compile($("#eventlist-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#event-li-tpl").html());