var app = {
	route: function() {
		var self = this;
		if(this.hasRegisteredUser){
			var hash = window.location.hash;
			if (!hash) {
				$('body').html(new HomeView(this.store).render().el);
				return;
			}
			var matchBooking = hash.match(app.bookingURL);
			var matchDetails = hash.match(app.detailsURL);
			if (matchDetails) {
				this.store.findById(Number(matchDetails[1]), function(event) {
					$('body').html(new EventView(event).render().el);
				});
			}else if (matchBooking){
				this.store.findById(Number(matchBooking[1]), function(event) {
					$('body').html(new BookingView(self.store,event).render());
				});
			}else{
					$('body').html(new HomeView(this.store).render(true).el);
			}
		}else{
			//$('body').html(new LoginView(this.store).render().el);
			$('body').html(new UserView(self.store).render().el);
		//	return;
		}
	},
	registerEvents: function(){
		var self = this;
		// Check of browser supports touch events...
		if (document.documentElement.hasOwnProperty('ontouchstart')){
			// ... if yes: register touch event listener to change the "selected" state of the item
			$('body').on('touchstart', 'a', function(event){
				$(event.target).addClass('tappable-active');
			});
			$('body').on('touchend', 'a', function(event){
				$(event.target).removeClass('tappable-active');
			});
		} else {
			// ... if not: register mouse events instead
			$('body').on('mousedown', 'a', function(event){
				$(event.target).addClass('tappable-active');
			});
			$('body').on('mouseup', 'a', function(event){
				$(event.target).removeClass('tappable-active');
			});
		}
		$(window).on('hashchange', $.proxy(this.route, this));
	},
	validateUser: function(){
		  var self = this;
		  self.store.getRegisteredUser(function(user){
		  if((user!=null)){
				$.getJSON("http://www.jivinjari.com/?json=events/validateuser&username="+user.username+"&password="+user.password+"&callback=?",function(data){
					var validateduser=JSON.parse(data);
					if(validateduser.isRegistered){
						self.hasRegisteredUser=true;
						console.log("valid user");
					}else{
						console.log("invalid user");
					}
			   self.route();
			  });
		  }else{
				console.log("null user record");
			   self.route();		  
		  }
	
		  });
	},
	initialize: function() {
		var self = this;
		this.hasRegisteredUser=false;
		this.bookingURL = /^#booking\/(\d{1,})/;
		this.detailsURL = /^#em_events\/(\d{1,})/;
		
		this.store = new LocalStorageStore(function() {
			self.validateUser();
		});
	this.registerEvents();	
	}

};

app.initialize();