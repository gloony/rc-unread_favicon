$(document).ready(function() {
	if($(".button.mail").length){
		window.setInterval(updateBadgeMail, 60000);
		updateBadgeMail();
	}
});
var lastMailsCount = null;
function updateBadgeMail(){
	$.ajax({
		type: "POST",
		url: "/?_task=mail_counter&_action=getunseen",
		data: "",
		xhrFields: {
			withCredentials: true
		},
		success: function (data) {
			if(isNaN(data)) document.location.href = document.location.href;
			if(data==0) data = null;
			if(lastMailsCount!=data){
				if(localStorage.rcmail_unreads===undefined) localStorage.setItem('rcmail_unreads', 0);
				lastMailsCount = data;
				$(".button.mail").attr('data-badge', data);
				if(localStorage.rcmail_unreads<data){
					localStorage.setItem('rcmail_unreads', data);
					var title = 'gMail';
					var icon = 'https://public.gloony.me/gloony/ico/gMail.png';
					var body = 'You have ' + data;
					if(data>1) body += ' unread mails';
					else body += ' unread mail';
					if(Notification.permission === "granted"){
						var notification = new Notification(title, { icon: icon, body: body });
						notification.onclick = function(){ window.focus(); this.close(); };
					}else Notification.requestPermission();
				}else if(localStorage.rcmail_unreads>data){
					localStorage.setItem('rcmail_unreads', data);
				}
			}
		},
	});
}