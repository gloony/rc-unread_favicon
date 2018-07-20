$(document).ready(function() {
	if($(".button-mail").length){
		window.setInterval(updateBadgeMail, 10000);
		updateBadgeMail();
	}
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
			if(data==0) data = null;
			$(".button-mail").attr('data-badge', data);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			// $("#wait_box").hide();
		},
	});
}