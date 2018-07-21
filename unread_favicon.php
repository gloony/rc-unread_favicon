<?php
	class unread_favicon extends rcube_plugin{
		public $task = '?(?!login|logout).*';
		function init(){
			$rcmail = rcmail::get_instance();
			$this->register_task('mail_counter');
			$this->register_action('getunseen', array($this, 'getunseen'));
			if ($rcmail->task == 'mail') {
				$this->include_script('favico-0.3.10.min.js');
				$this->include_script('unread_favicon.js');
			}else{
				$this->include_script('unread_badge.js');
			}
		}
		function getunseen(){
			$rcmail = rcmail::get_instance();
			$prefs = unserialize($rcmail->user->data['preferences']);
			$result = 0;
			$srv = '{'.$_SESSION['storage_host'].':'.$_SESSION['storage_port'].'/imap/'.$_SESSION['storage_ssl'].'}';
			$mbox=imap_open($srv, $rcmail->user->get_username(), $rcmail->get_user_password(), OP_READONLY);
			if(!$mbox) die(0);
			$folders = imap_list($mbox, $srv, '*');
			foreach($folders as $folder){
				if(isset($prefs['junk_mbox'])&&!$this->endsWith($folder, $prefs['junk_mbox'])){
					$items = imap_status($mbox, $folder, SA_UNSEEN);
					$result += $items->unseen;
				}
			}
			imap_close($mbox);
			echo $result;
			exit;
		}
		private function endsWith($haystack, $needle){
			$length = strlen($needle);
			return $length === 0 || (substr($haystack, -$length) === $needle);
		}
	}
