//docker run -d --hostname my-rabbit --name rabbit13 -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management
//http://localhost:15672/#/
//user:guest
//pass:guest
const express=require('express');
const app=express();



app.use(express.static('public'));
app.use(express.json());



app.use('/api', require('./routes/api'));
//Rota de health check
app.get('/', (req, res) => {
    res.send('Hello world! Its running!')
})

const PORT=process.env.PORT||3000;

// Inicia o servidor e escuta na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });