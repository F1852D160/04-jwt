const express = require("express");
bodyParser = require("body-parser");
jwt = require("jsonwebtoken");

app = express()
app.set("llaveprivadajwt","mi clave ultrasecreta.123");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Inicio');
});

app.get('/public',(req, res)=>{
    res.send("Ruta publica");
});

app.get('/productos',(req, res)=>{
    const productos = [
      { id: 1, nombre: "Asfo" },
      { id: 2, nombre: "Denisse" },
      { id: 3, nombre: "Carlos" }
     ];

     res.json(productos);
});

app.get('/login',(req, res)=>{
    res.send("Formulario de login");
});

// 5
app.listen(3000,()=>{
    console.log('Servidor iniciado en el puerto 3000') 
});


