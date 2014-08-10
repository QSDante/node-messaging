<?php
/**
* 
*/
class Msg{
	protected $ip;
	protected $port;
	protected $sock;

	public function __construct($config = NULL){
		$this->sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		if(FALSE === $this->sock) throw new Exception(socket_strerror($errno=socket_last_error()), $errno);

		// expr3 of "?:" are the Config of Node.js Socket Server,
		// can be replaced by system config for default value
		$this->ip = isset($config['ip']) ? $config['ip'] : '127.0.0.1';
		$this->port = isset($config['port']) ? $config['port'] : 8889;
	}

	public function send($msg){
		$msg = json_encode($msg);
		if(FALSE === $msg) throw new Exception('Unsupported param type! $msg should be an Array.');

		if(!socket_connect($this->sock, $this->ip, $this->port))
			throw new Exception(socket_strerror($errno=socket_last_error(($this->sock)), $errno);
		if(FALSE === socket_write($this->sock, $msg))
			throw new Exception(socket_strerror($errno=socket_last_error(($this->sock)), $errno);
		socket_close($this->sock);
	}
}

/* End of file Msg.php */