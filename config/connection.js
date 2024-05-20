import mysql2 from "mysql2/promise";

async function connect() {
	if(global.connection && global.connection.state !== 'disconnected')
		return global.connection;
		
		const mysql = mysql2;
		//mysql://usuario:senha@servidor:porta/banco - conexao assincrona
		const connection = await mysql.createConnection("mysql://root:@localhost:3306/n2");
		console.log("Conectado ao SGBD MySql");
		global.connection = connection;
		return connection;
}

export default connect;