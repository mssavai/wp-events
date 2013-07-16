var app = {
	route: function() {
		if(this.signedon){
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
					$('body').html(new BookingView(event).render().el);
				});
			}else{
					$('body').html(new HomeView(this.store).render(true).el);
			}
		}else{
			$('body').html(new LoginView(this.store).render().el);
			return;
		}
	},
	registerEvents: function(){
		var self = this;
		// Check of browser supports touch events...
		if (document.documentElement.hasOwnProperty('ontouchstart')) {
			// ... if yes: register touch event listener to change the "selected" state of the item
			$('body').on('touchstart', 'a', function(event) {
				$(event.target).addClass('tappable-active');
			});
			$('body').on('touchend', 'a', function(event) {
				$(event.target).removeClass('tappable-active');
			});
		} else {
			// ... if not: register mouse events instead
			$('body').on('mousedown', 'a', function(event) {
				$(event.target).addClass('tappable-active');
			});
			$('body').on('mouseup', 'a', function(event) {
				$(event.target).removeClass('tappable-active');
			});
		}
		$(window).on('hashchange', $.proxy(this.route, this));
	},
	wpSignOn: function(){
		var loginView=new LoginView(this.store);
			$('body').html((loginView).signon().el);
			return;		
	},
	initialize: function() {
		var self = this;
		this.signedon=true;
		this.bookingURL = /^#booking\/(\d{1,})/;
		this.detailsURL = /^#em_events\/(\d{1,})/;
		
		this.store = new MemoryStore(function() {
			self.route();
		});
	this.registerEvents();	
	}

};

app.initialize();