var unread_favicon_lastunread = null;
function unread_favicon_badge(data){
  if(data==0) data = null;
  if(unread_favicon_lastunread!=data){
    unread_favicon_lastunread = data;
    if($(".button-mail").length) $(".button-mail").attr('data-badge', data);
    if(localStorage.getItem('unread_favicon.unread.counter')===undefined) localStorage.setItem('unread_favicon.unread.counter', 0);
    if(localStorage.getItem('unread_favicon.unread.counter')<data){
      localStorage.setItem('unread_favicon.unread.counter', data);
      var title = 'Mail';
      var icon = 'skins/elastic/images/logo.png';
      var body = 'You have ' + data;
      if(data>1) body += ' unread mails';
      else body += ' unread mail';
      if(Notification.permission === "granted"){
        var notification = new Notification(title, { icon: icon, body: body });
        notification.onclick = function(){ window.document.location.href = './?_task=mail'; window.focus(); this.close(); };
      }else Notification.requestPermission();
    }else if(localStorage.getItem('unread_favicon.unread.counter')>data){
      localStorage.setItem('unread_favicon.unread.counter', data);
    }
  }
}

rcmail.addEventListener('plugin.unread_favicon_refresh', function(evt){ unread_favicon_badge(evt.unread); });