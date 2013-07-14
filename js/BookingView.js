var BookingView = function(event) {
	this.render = function() {
		this.el.html(BookingView.template(event));
		return this;
	}; 
	this.sendBooking=function(){
		console.log( "...sendBooking");
		var form = $("#booking-form"); 
		var es = $(".input_booking_event_spaces", form).val();
		var eid = $(".input_booking_event_event_id", form).val();
		var uid = 1;
			$.ajax({
				type: 'POST',
				url:"http://www.jivinjari.com/?json=events/booking",
				data:{booking_spaces:s,event_id:eid,user_id:uid},
				dataType: "json",
				async:true,
				contentType: "application/json; charset=utf-8",
				error: function (xhr){ 
						var err=eval("("+xhr.responseText+")");
						console.log( "booking:::error"+err.Message);
					},	
				success: function (xhr){ 
						//var err=eval("("+xhr.responseText+")");
						//console.log( "login:::error"+err.Message);
					},
				complete:function(data){
					console.log( "login:::click booking callback"  + data);
				}
			});	
	}
    this.initialize = function() {
        this.el = $('<div/>');
		this.el.on('click','btn-book-event',this.sendBooking);
    };
 
    this.initialize();
 
 }
BookingView.template = Handlebars.compile($("#event-booking-tpl").html());