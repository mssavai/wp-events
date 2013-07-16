var BookingView = function(event) {
	var self=this;
	this.render = function() {
		this.el.html(BookingView.template(event));
		$('.booking-data').trigger('bookingpageloaded');
		return this;
	}; 
	this.loadBookingForm=function(){
		$('.booking-data').html(BookingView.formTemplate());
		return this;
	};
	this.displayBookingResults=function(data){
			var booking_results=JSON.parse(data, function (key, value) {
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
		$('.booking-data').html(BookingView.resultsTemplate(booking_results));		
	};
	this.sendBooking=function(){
		console.log( "...sendBooking");
		var es = $(".input_booking_event_spaces").val();
		var eid = $(".input_booking_event_event_id").val();
		var uid = 3;
		var booking_data={'booking_spaces':es,'event_id':eid,'user_id':uid}
		$.getJSON("http://jivinjari.com/?json=events/booking&callback=?",'',function(data){
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
		$('.booking-data').html(BookingView.resultsTemplate(booking_results));		
		});
	};

    this.initialize = function(){
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