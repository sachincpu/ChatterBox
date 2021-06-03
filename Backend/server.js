import express from 'express';
import mongoose from 'mongoose';
import Pusher from "pusher";
import cors from 'cors';

//App Config
const app = express();
const port=process.env.PORT || 9000;
const connection_url='mongodb+srv://admin:D0Yrp6jklsLZHo59@cluster0.wqjfy.mongodb.net/chatousdb?retryWrites=true&w=majority';

var pusher = new Pusher({
  appId: "1206509",
  key: "7d1eaec8b549940e519c",
  secret: "d6577295b64ac518b27c",
  cluster: "ap2",
  useTLS: true
});

//MiddleWare
app.use(express.json());
app.use(cors());

//DB Config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
});

const chatousSchema = new mongoose.Schema({
 message: String,
 name: String,
timestamp:String,
received:Boolean
});

const Messages =mongoose.model("messagecontent", chatousSchema);

const db = mongoose.connection;

db.once('open',() => {
    console.log("db connected");
    
    const msgCollection = db.collection("messagecontents");
    const changesStream = msgCollection.watch();
    
    changesStream.on('change', (change)=>{
        console.log(change);
        
        if(change.operationType === "insert"){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted",
                          {
                name: messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received,
            });
        }else{
            console.log("Error triggering pusher");
        }
    });
});

//API Routes
app.get('/',(req,res) =>
        res.status(200).send("Hello World")
       );

app.post("/messages/new", (req,res) => {
   const dbMessage=req.body;
    
    Messages.create(dbMessage, (err,data) =>{
       if(err){
           res.status(500).send(err);
       } else{
           res.status(201).send(data);
       }
    });
});

app.get("/messages/sync", (req,res) => {    
    Messages.find((err,data) =>{
       if(err){
           res.status(500).send(err);
       } else{
           res.status(200).send(data);
       }
    });
});

//Listener
app.listen(port,()=>console.log(`Listening on localhost:${port}`));