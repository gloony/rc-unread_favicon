function updateFavicon(){
	var count = 0;
	$('.unreadcount').each(function(){
		var c = parseInt($(this).text());
		if(c && !isNaN(c)){
			count += c;
		}
	});
	if(count !== last){
		faviconMail.badge(count);
		last = count;
		if(count==0) count = null;
		$(".button-mail").attr('data-badge', count);
	}
}
var last = -1;
var faviconMail=new Favico({
	animation:'pop'
});
$(document).ready(function() {
	window.setInterval(updateFavicon, 4000);
	updateBadgeMail();
});
function updateBadgeMail(){
	$.ajax({
		type: "POST",
		url: "/?_task=mail_counter&_action=getunseen",
		data: "",
		xhrFields: {
			withCredentials: true
		},
		success: function (data) {
			faviconMail.badge(data);
			if(data==0) data = null;
			$(".button-mail").attr('data-badge', data);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			// $("#wait_box").hide();
		},
	});
}