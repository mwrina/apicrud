import mysql2 from "mysql2/promise";

async function connect() {
	if(global.connection && global.connection.state !== 'disconnected')
		return global.connection;
		
		const mysql = mysql2;
		//mysql://usuario:senha@servidor:porta/banco - conexao assincrona
		const connection = await mysql.createConnection("mysql://root:@localhost:3306/universidade");
		console.log("Conectado ao SGBD MySql");
		//SE ESTIVER CONECTADO, JOGA A VARIÁVEL PARA O RETURN
		global.connection = connection;
		return connection;
}

//PEGA A VARIÁVEL RETORNADA PELA FUNCAO CONNECT
export default connect;