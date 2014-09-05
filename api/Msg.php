<?php
/**
 * @author ZongPei Huang
 */
class Msg{
	protected $ip;
	protected $port;

	/**
	 * @param <config> Array(keys: ip, port), use the config if given
	 * @throws Exception socket error with Error No.
	 */
	public function __construct($config = NULL){
		// expr3 of "?:" are the Config of Node.js Socket Server,
		// can be replaced by system config for default value
		$this->ip = isset($config['ip']) ? $config['ip'] : '127.0.0.1';
		$this->port = isset($config['port']) ? $config['port'] : 8889;
	}

	/**
	 * Send message to the Messaging Server
	 * @param <msg> Array of data be sent
	 * @return No return
	 * @throws Exception error message (if socket error, with Error No.)
	 */
	public function send($msg){
		$msg = json_encode($msg);
		if(FALSE === $msg) throw new Exception('Unsupported param type! $msg should be an Array.');

		$sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		if(FALSE === $sock) throw new Exception(socket_strerror($errno=socket_last_error()), $errno);
		if(!socket_connect($sock, $this->ip, $this->port))
			throw new Exception(socket_strerror($errno=socket_last_error($sock), $errno));
		if(FALSE === socket_write($sock, $msg))
			throw new Exception(socket_strerror($errno=socket_last_error($sock), $errno));
		socket_close($sock);
	}
}

/* End of file Msg.php */
