const express = require("express");
bodyParser = require("body-parser");
jwt = require("jsonwebtoken");

app = express()
app.set("llaveprivadajwt","mi clave ultrasecreta.123");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['token-de-acceso'];

    if (token) {
      jwt.verify(token, app.get('llaveprivadajwt'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token no valido' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveído.' 
      });
    }
 });


app.get('/', function(req, res) {
    res.send('Inicio');
});

app.get('/public',(req, res)=>{
    res.send("Ruta publica");
});

app.get('/productos',rutasProtegidas,(req, res)=>{
    const productos = [
      { id: 1, nombre: "Asfo" },
      { id: 2, nombre: "Denisse" },
      { id: 3, nombre: "Carlos" }
     ];

     res.json(productos);
});

app.post('/login',(req, res)=>{
    //res.send("Formulario de login");

    if(req.body.usuario === "admin" && req.body.clave === "admin") {
        const payload = {
        check:  true
       };
      const tokenGenerado = jwt.sign(payload, app.get('llaveprivadajwt'), {
        expiresIn: 1440
      });
      res.json({
        mensaje: 'Autenticación correcta',
        token: tokenGenerado
      });
      } else {
          res.json({ mensaje: "Usuario o contraseña incorrectos"})
      }
});

// 5
app.listen(3000,()=>{
    console.log('Servidor iniciado en el puerto 3000') 
});


