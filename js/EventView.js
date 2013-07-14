var EventView = function(event) {
	this.render = function() {
		this.el.html(EventView.template(event));
		return this;
	}; 
    this.initialize = function() {
        this.el = $('<div/>');
    };
 
    this.initialize();
 
 }
 
EventView.template = Handlebars.compile($("#event-tpl").html());