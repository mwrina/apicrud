import connect from "../config/connection.js";

//OBJETO VAZIO A SER EXPORTADO PARA OUTROS ARQUIVOS DA APLICAÇÃO
let aluno = {}

//IMPORTAÇÃO DA CONEXÃO COM O BD
const con = await connect();

// "aluno.all" = REFERÊNCIA PARA A ROTA
// (req, res) => REQ = REQUISIÇÃO,
//               RES = RESPOSTA (RETORNO)
aluno.all = async function (req, res)
{

    //OBS: recomendado utilizar o try-catch onde não se possui controle sobre a entrada/saída de dados
    try 
    {
        //QUERY SQL
        let alunos = await con.query(`SELECT * FROM aluno;`);

        //MÉTODO QUE DEVOLVE O VALOR PARA QUEM FEZ A REQUISIÇÃO
        res.send(alunos);
    }
    catch (err)
    {
        //EXECUTA SE HOUVER ERRO NA CONSULTA E EXIBE QUAL FOI
        console.log("erro consulta..........", err);
    }
}

aluno.create = async function (req, res) {
    try {

        /*  Requisição possui duas partes:
            HEAD: para quem é a requisição, de onde vem, etc.
            BODY: conteúdo da requisição, o que estamos pedindo. */

        //CONTEÚDO DA REQUISIÇÃO -> ARMAZENADO DENTRO DA VARIÁVEL ALUNO
        let aluno = req.body;

        //DECLARA QUERY
        let sql = `INSERT INTO aluno(matricula, nome, email)
                    VALUES (?,?,?);`
        
        //ESTA VARIÁVEL ARMAZENA OS VALORES INFORMADOS PELO CLIENTE
        //DENTRO DO BODY DA REQUISIÇÃO
        let values = [aluno.matricula, aluno.nome, aluno.email];
        
        //EXECUTA QUERY
        let result = await con.query(sql, values);

        //DÁ UM RETORNO AO USUÁRIO SOBRE O SUCESSO DA REQUISIÇÃO
        res.send({
            //MOSTRA O STATUS NA TELA
            status: "Inserção realizada com sucesso.",
            //MOSTRA O QUE FOI INSERIDO NA TABELA COM O COMANDO EXECUTADO
            result: result
        });

    } catch (err) {
        console.log("Erro.........", err);
        
    }
}

aluno.update = async function (req, res) {

    try {

        //PARÂMETRO VINDO DO CLIENTE (ele informa a matrícula do
        //aluno cujo cadastro será alterado)
        let matricula = req.params.matricula;

        let aluno = req.body;

        //DECLARA A QUERY
        let sql = `UPDATE aluno SET nome = ?, email = ? WHERE matricula = ?;`
        //DEFINE OS VALORES (informados pelo cliente) A SUBSTITUÍ-
        //REM OS "?" NA QUERY
        const values = [aluno.nome, aluno.email, matricula];

        //EXECUTA QUERY
        let result = await con.query(sql, values);
        
        //RETORNO PARA O CLIENTE QUANTO AO SUCESSO DA OPERAÇÃO
        res.send({
            status: `Atualização do aluno de matrícula ${matricula} realizada com sucesso!`,
            result: result
        });

    } catch (err) {
        console.log("Erro........", err);
    }

}

aluno.delete = async function (req, res) {

    try {

        //PARÂMETRO VINDO DO CLIENTE (ele informa a matrícula do
        //aluno cujo cadastro será apagado)
        let matricula = req.params.matricula;

        //não precisa do body nem do values

        //DECLARA A QUERY
        let sql = `DELETE FROM aluno WHERE matricula = ?;`

        //EXECUTA QUERY
        let result = await con.query(sql, [matricula]);

        //RETORNO PARA O CLIENTE QUANTO AO SUCESSO DA OPERAÇÃO
        res.send({
            status: `Exclusão do aluno de matrícula ${matricula} realizada com sucesso!`,
            result: result
        });

    } catch (err) {
        console.log("Erro..........", err);
    }

}

export {aluno}