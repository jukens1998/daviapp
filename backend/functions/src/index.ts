import * as functions from 'firebase-functions';
// CROSS ORIGIN REQUEST ES AJAX DESDE CUALQUIER DOMINIO
import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';

var config = {
    apiKey: "AIzaSyDrpb9bI3cseBJZAFhyNDgFDJ1ZMfqYSPo",
    authDomain: "daviapp-3c32e.firebaseapp.com",
    databaseURL: "https://daviapp-3c32e.firebaseio.com",
    projectId: "daviapp-3c32e",
    storageBucket: "daviapp-3c32e.appspot.com",
    messagingSenderId: "410411896422",
    appId: "1:410411896422:web:a9bcf5e4b9ba582a"
}
/* firebase.initializeApp(config); */

// Conectarse con firebase para acceder a lo que sea del proyecto
admin.initializeApp(config);
var db = admin.firestore();

const app = express();

// Middleware
app.use(cors());


/* PERSONAS */

// TODO: OBTENER TODAS 

// TODO: OBTENER PERSONAS FILTRO

// TODO: REGISTRAR PERSONA EN FIREBASE








/* EVENTOS */

// TODO: REGISTRO DE EVENTOS

// TODO: CONSULTAR

// TODO: FILTRAR EVENTOS



//--------------------------- NOTIFICACIONES -------------------------------

// Enviar notificacion a otro token usuario
app.post('/notificaciones/user', async(req, res)=>{
    let token = req.body.token;
    try {
        let response  = await admin.messaging().send({
            notification:{
                title: req.body.title,
                body: req.body.msg,
            }, 
            data:{
            },
            token: token  /* Esta es la condicion para enviar a ese dispositivo que le corresponde */
        });
    
        return res.json(response);
    } catch (error) {
        return res.json(error).status(500);/* Error en el servidor */
    }
});

// Notificaciones para eventos nuevos
app.post('/notificaciones/eventos', async(req, res)=>{
    // TODO: NOTIFICAR A PERSONAS INTERESADAS SOLAMENTE O CERCANAS
    // let token = req.body.token;
    try {
        let response  = await admin.messaging().send({
            notification:{
                title: req.body.title,
                body: req.body.msg,
            }, 
            data:{
                fecha: req.body.fecha,
                lugar: req.body.lugar,
            },
            condition: "" 
        });
    
        return res.json(response);
    } catch (error) {
        return res.json(error).status(500);/* Error en el servidor */
    }
});


app.post("/new/token", async(req, resp)=>{
    try {
        db.collection('tokens').doc(req.body.token).set({token: req.body.token}).then().catch;
        return resp.json(req.body.token);
    } catch (error) {
        return resp.json(error);
    }
});


// TODO: RUTA ESCUCHAR SIEMPRE A LOS CAMBIOS DE FIREBASE Y SEGUN ESO NOTIFICAR


/* Enlaza todas las rutas de app como cloud functions */
/* lO QUE ME DE AL FINAL  */
exports.daviapp = functions.https.onRequest(app);

/* 
    Subir
    $ firebase deploy --only functions # y me da la url ooooo usar ngrok
*/


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
