var dBar = {
		
	TYPE_DEBUG : "debug",
	TYPE_INFO : "info",
	TYPE_ERROR : "error",
	TYPE_WARNING : "warning",
	
	_get : function() {
	
		return sessionScope.get("dBar") ||
			{
				isCollapsed : false,
				isEnabled : true,
				messages : [],
				isInit : false
			};
	
	}, 
	
	init : function( collapsed:boolean ) {
		
		var dBar = this._get();
		if (!dBar.isInit) {
			dBar.isInit = true;
			dBar.isCollapsed = collapsed;
		}
		sessionScope.put("dBar", dBar);
		
	},

	setCollapsed : function( to:boolean ) {
		
		var dBar = this._get();
		dBar.isCollapsed = to;
		sessionScope.put("dBar", dBar);
		
	},
	
	setEnabled : function( to:boolean ) {
		
		var dBar = this._get();
		dBar.isEnabled = to;
		sessionScope.put("dBar", dBar);
		
	},
	
	//check if the toolbar is enabled
	isEnabled : function() {
		return this._get().isEnabled;
	},
	
	//returns if the toolbar is in a collapsed or expanded state
	isCollapsed : function() {
		return this._get().isCollapsed;
	},
	
	//retrieve a list of messages
	getMessages : function() {
		return this._get().messages;
	},
	
	//clears the list of messages
	clearMessages : function() {
		var dBar = this._get();
		dBar.messages = [];
		sessionScope.put("dBar", dBar);
	},
		
	//add a message to the toolbar
	//note: this function doesn't do anything if the toolbar is disabled
	addMessage : function(msg, type:String) {
		
		try {
		
			var dBar = this._get();
			
			if ( !dBar.isEnabled ) { return; }
			
			var messages = dBar.messages;
			
			if (typeof msg != "string") {
				msg = msg.toString();
			}
			
			var m = {"text": msg, "date" : @Now(), "type" : type};
			messages.unshift( m );
			
			dBar.messages = messages;
			
			sessionScope.put("dBar", dBar);
			
		} catch (e) {		//error while logging
			print(e.toString() );
		}

	},
	
	//function to log different types of messages
	debug : function(msg) {
		this.addMessage(msg, this.TYPE_DEBUG);	
	},
	info : function(msg) {
		this.addMessage(msg, this.TYPE_INFO);	
	},
	error : function(msg) {
		this.addMessage(msg, this.TYPE_ERROR);	
	},
	warn : function(msg) {
		this.addMessage(msg, this.TYPE_WARNING);	
	}
		
}