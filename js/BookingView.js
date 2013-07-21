var BookingView = function(store,event) {
	var self=this;
	this.render = function() {
		// this.el.html(BookingView.template(event));
		// $('.booking-data').trigger('bookingpageloaded');
		// return this;
		this.store.getRegisteredUser(function(user){
			if(user){
				var spaces=prompt('Enter Number of spaces');
				if(!spaces){
					alert('Booking cancelled');
					return;
				}
				var event_id = event.event_id;
				var username=user.username;
				var password=user.password;
				var user_id = user.user_id;
				var booking_data={'booking_spaces':spaces,'event_id':event_id,'user_id':user_id,'username':username,'password':password};	
				var results=self.sendBooking(booking_data);
				//store the results
			}else{
				//get user details and attempt login
				alert('no registered user');
			}
		});

	}
	this.sendBooking=function(booking_data){
				$.getJSON("http://www.jivinjari.com/?json=events/booking&callback=?",booking_data,function(data){
			var booking_results=JSON.parse(data, function (key, value){
					var type;
					if (value && typeof value === 'object') {
						type = value.type;
						if (typeof type === 'string' && typeof window[type] === 'function'){
							return new (window[type])(value);
						}
					}
					return value;
				});
		console.log(booking_results);
		alert(booking_results.feedback_message);	
		});	
	}; 
	this.loadBookingForm=function(){
		//$('.booking-data').html(BookingView.formTemplate());
		return prompt('Enter Number of spaces');
		//return this;
	};

    this.initialize = function(){
		this.store=store;
		this.el = $('<div/>');
		this.el.on('bookingpageloaded','.booking-data',this.loadForm);
		this.el.on('click','.btn-book-event',this.sendBooking);
		this.el.on('event-booking-succcess','.btn-book-event',this.displayBookingResults);
    };
 
    this.initialize();
 
 }
BookingView.template = Handlebars.compile($("#event-booking-tpl").html());
BookingView.formTemplate = Handlebars.compile($("#event-booking-form-tpl").html());
BookingView.resultsTemplate = Handlebars.compile($("#event-booking-results-tpl").html());