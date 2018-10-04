const fp = {
	
	getBaseUrl: function(){
		if(location.host === "localhost") return "http://localhost/fp/";
		if(location.host === "staging.usd21.org") return "http://staging.usd21.org/m/fp/";
		if(location.host === "usd21.org") return "http://usd21.org/m/fp/";
		return "http://usd21.org/m/fp/";
	},

	events: {
		onHashChange: function(evt){
			window.addEventListener("hashchange", function(){
				fp.showView(window.location.hash);
			}, false);
		},
		attachEvents: function(){
			fp.events.onHashChange();
		}
	},

	poll: {},

	pollInitial: function(){
		localforage.getItem("poll").then(function(poll){
			var baseUrl = getBaseUrl();
			var pollingUrl = baseUrl + "js/poll.json";
			if(!poll){
				$.get(pollingUrl).then(function(data){
					localforage.setItem("poll", data).then(function(allSet){
						fp.poll = JSON.parse(allSet);
					});
				});
			} else {
				fp.poll = poll;
			}
		})
	},

	pollServer: function(){
	},
	
	detectLang: function(){
		var lang = navigator.language || navigator.browserLanguage;
		lang = lang.substring(0,2);
		lang = lang.toLowerCase();
		if(! lang.length === 2) return;
		localforage.setItem("lang", lang).then(function(lang){
			return lang;
		});
	},

	checkLang: function(){
		localforage.getItem("lang").then(function(lang){
			if(!lang) fp.showView("chooseLang");
		});
	},

	showView: function(view){
		window.location.hash = view;
	},

	init: function(){
		fp.detectLang();
		fp.pollInitial();
		fp.checkLang();
		fp.events.attachEvents();
	}

};

fp.init();
