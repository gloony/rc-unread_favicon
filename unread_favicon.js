$(document).ready(function(){
	faviconMail = new Favico({animation:'fade',bgColor:'#37beff'});
	if($(".button.mail").length){
		window.setInterval(updateBadgeMail, 4000);
		window.setTimeout(updateBadgeMail, 2000);
	}
	$('.button.mail').on('click', function(e){
		e.stopImmediatePropagation();
		e.stopPropagation();
		if(lastMailsCount>0) document.location.href = '?_task=mail&_filter=UNSEEN&_scope=all';
		return false;
	});
});
var lastMailsCount = 0;
var faviconMail = null;
function updateBadgeMail(){
	var count = 0;
	$('.unreadcount').each(function(){
		var c = parseInt($(this).text(), 10);
		if(c && !isNaN(c)) count += c;
	});
	if(count===null) count = 0;
	if(lastMailsCount!=count){
		if(localStorage.rcmail_unreads===undefined) localStorage.setItem('rcmail_unreads', 0);
		faviconMail.badge(count);
		lastMailsCount = count;
		if(count===0) $(".button.mail").attr('data-badge', null);
		else $(".button.mail").attr('data-badge', count);
		if(localStorage.rcmail_unreads<count){
			localStorage.setItem('rcmail_unreads', count);
			var title = 'Mail';
			var icon = 'skins/elastic/images/logo.png';
			var body = 'You have ' + count;
			if(count>1) body += ' unread mails';
			else body += ' unread mail';
			if(Notification.permission === "granted"){
				var notification = new Notification(title, { icon: icon, body: body });
				notification.onclick = function(){ window.focus(); this.close(); };
			}else Notification.requestPermission();
		}else if(localStorage.rcmail_unreads>count){
			localStorage.setItem('rcmail_unreads', count);
		}
	}
}