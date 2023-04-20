const express = require('express')
const amqp = require('amqplib');

const router = express.Router()

router.get('/', (req, res) => {
    res.send('API rodando!')
})

async function enviarMensagem() {
    try {
      // Cria uma conexão
      const conexao = await amqp.connect('amqp://localhost');
  
      // Cria um canal
      const canal = await conexao.createChannel();
  
      // Declara uma fila
      await canal.assertQueue('minhaFila', { durable: false });
  
      // Envia uma mensagem para a fila
      const mensagem = 'Minha mensagem';
      canal.sendToQueue('minhaFila', Buffer.from(mensagem));
  
      console.log('Mensagem enviada:', mensagem);
  
      // Fecha o canal e a conexão
      await canal.close();
      await conexao.close();
    } catch (erro) {
      console.error('Erro ao enviar mensagem para a fila:', erro);
    }
  }
  
  enviarMensagem();

module.exports = router