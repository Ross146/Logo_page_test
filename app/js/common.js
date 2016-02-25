var accounts;
var startload = 0;
var endload = 10;
var inProgress = false;
jQuery.ajax = function (d) {
	var b = location.protocol,
			e = RegExp(b + "//" + location.hostname),
			f = "http" + (/^https/.test(b) ? "s" : "") + "://query.yahooapis.com/v1/public/yql?callback=?";
	return function (a) {
		var c = a.url;
		if (/get/i.test(a.type) && !/json/i.test(a.dataType) && !e.test(c) && /:\/\//.test(c)) {
			a.url = f;
			a.dataType = "json";
			a.data = {
				q: 'select * from html where url="{URL}" and xpath="*"'.replace("{URL}", c + (a.data ? (/\?/.test(c) ? "&" : "?") + jQuery.param(a.data) : "")),
				format: "xml"
			};
			!a.success && a.complete && (a.success = a.complete, delete a.complete);
			var b = a.success;
			a.success = function (a) {
				b && b.call(this, {
					responseText: (a.results[0] || "").replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, "")
				}, "success")
			}
		}
		return d.apply(this, arguments)
	}
}(jQuery.ajax);


		function Refresh() {
			$.ajax({
				url: 'http://dev.frevend.com/json/users.json',
				type: 'GET',
				success: ParseAnswer
			})};
		Refresh()
		function ParseAnswer(data) {
			data =  $('<div/>',{'html': data.responseText}).text();
			data = JSON.parse(data);
			accounts = data;
			preloadselection(accounts);
		}

function preloadselection(originobject) {
	var object = JSON.stringify(originobject);
	object = JSON.parse(object);
	object['users'].forEach(function(item,i){
		if ((item.id > endload) && (item.id > startload)){
			console.log(item.id)
			delete( object['users'][i]);
		}
	});
	templating(object);
}

function scrollisten() {
	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() >= $(document).height() - 200 && !inProgress) {
			console.log("scroll");
			endload += 10;
			startload += 10;
			inProgress = true;
			preloadselection(accounts);
		}
	})
}

function templating(accounts) {
	console.log(accounts);
	var accountstemplate = $("#accounts").text();
	//console.log(accountstemplate);

	var data = _.template(accountstemplate);
	var insertdata =data(accounts);
	var ul = document.createElement('ul');
	ul.innerHTML = insertdata;
	$("#accounts-list").append(ul);
}


$(function() {

	$('.toggle-mnu').click(function () {
		$(this).toggleClass('on');
		$('menu').slideToggle();
	});

	$(".carousel").owlCarousel({
		items: 1,
		nav: true,
		navText: '',
		loop: true
	});


		//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });


	scrollisten();

});

