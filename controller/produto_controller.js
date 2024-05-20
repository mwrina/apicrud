import connect from "../config/connection.js";

//OBJETO VAZIO A SER EXPORTADO PARA OUTROS ARQUIVOS DA APLICAÇÃO
let produto = {}

//IMPORTAÇÃO DA CONEXÃO COM O BD
const con = await connect();

//MOSTRA TODOS OS PRODUTOS CADASTRADOS
produto.all = async function (req, res)
{

    try 
    {
        let produtos = await con.query(`SELECT * FROM produto;`);

        res.send(produtos);
    }
    catch (err)
    {
        console.log("Erro na consulta -> ", err);
    }
}

//MOSTRA TODOS OS PRODUTOS CADASTRADOS
produto.busca_preco = async function (req, res)
{

    try {
        //PARÂMETRO VINDO DO CLIENTE (ele informa o código do
        //produto cujo cadastro será alterado)
        let preco = req.params.preco_produto;

        let sql = `SELECT * FROM produto WHERE preco_produto = ?;`

        let result = await con.query(sql, [preco]);
        
        res.send({result});

    } catch (err) {
        console.log("Erro na consulta -> ", err);
    }
}

//INSERIR DADOS NA TABELA PRODUTO
produto.create = async function (req, res) {
    try {

        let produtos = req.body;

        let sql = `INSERT INTO produto
                    VALUES (?,?,?);`
        
        //ESTA VARIÁVEL ARMAZENA OS VALORES INFORMADOS PELO CLIENTE
        //DENTRO DO BODY DA REQUISIÇÃO
        let values = [produtos.cod_produto, produtos.nome_produto, produtos.preco_produto];
        
        //EXECUTA QUERY
        let result = await con.query(sql, values);

        res.send({
            status: "Inserção realizada com sucesso.",
            result: result
        });

    } catch (err) {
        console.log("Erro na inserção -> ", err);
    }
}

//ALTERA SOMENTE O NOME DO PRODUTO
produto.update_nome = async function (req, res) {

    try {

        //PARÂMETRO VINDO DO CLIENTE (ele informa o código do
        //produto cujo cadastro será alterado)
        let cod_produto = req.params.cod_produto;

        let produtos = req.body;

        let sql = `UPDATE produto SET nome_produto = ? WHERE cod_produto = ?;`

        const values = [produtos.nome_produto, cod_produto];

        let result = await con.query(sql, values);
        
        res.send({
            status: `Atualização do produto de ID ${cod_produto} realizada com sucesso!`,
            result: result
        });

    } catch (err) {
        console.log("Erro na alteração -> ", err);
    }

}

//ALTERA SOMENTE O PRECO DO PRODUTO
produto.update_preco = async function (req, res) {

    try {

        let cod_produto = req.params.cod_produto;

        let produtos = req.body;

        let sql = `UPDATE produto SET preco_produto = ? WHERE cod_produto = ?;`

        const values = [produtos.preco_produto, cod_produto];

        let result = await con.query(sql, values);
        
        res.send({
            status: `Atualização do produto de ID ${cod_produto} realizada com sucesso!`,
            result: result
        });

    } catch (err) {
        console.log("Erro na alteração -> ", err);
    }

}

//ALTERA TODO UM PRODUTO
produto.update = async function (req, res) {

    try {

        let cod_produto = req.params.cod_produto;

        let produtos = req.body;

        let sql = `UPDATE produto SET nome_produto = ?, preco_produto = ? WHERE cod_produto = ?;`

        const values = [produtos.nome_produto, produtos.preco_produto, cod_produto];

        let result = await con.query(sql, values);
        
        res.send({
            status: `Atualização do produto de ID ${cod_produto} realizada com sucesso!`,
            result: result
        });

    } catch (err) {
        console.log("Erro na alteração -> ", err);
    }

}

//DELETA UM PRODUTO
produto.delete = async function (req, res) {

    try {

        let cod = req.params.cod_produto;

        let sql = `DELETE FROM produto WHERE cod_produto = ?;`

        let result = await con.query(sql, [cod]);

        res.send({
            status: `Exclusão do produto de ID ${cod} realizada com sucesso!`,
            result: result
        });

    } catch (err) {
        console.log("Erro na exclusão -> ", err);
    }

}



export {produto}