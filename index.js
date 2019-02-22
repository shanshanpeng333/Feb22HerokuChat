import express from 'express';
import bodyParser  from "body-parser";
import Game  from "./Game";

// Create a new express application instance
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("www"));

app.get("/users/:uname", (req, res) => { //a function with parameters
    res.end("Hello " + req.params.uname + "... How are you today? What are you doing?");
});

let oGames = {};
app.post("/sms", (req, res) =>{
    let sFrom = req.body.From;
    if(!oGames.hasOwnProperty(sFrom)){
        oGames[sFrom] = new Game();
    }    
    let sReply = oGames[sFrom].makeAMove(req.body.Body);

    res.end("<Response><Message>" + 
    sReply + "</Message></Response>");

});

var port = process.env.PORT || parseInt(process.argv.pop()) || 3000;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));
