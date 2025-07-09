//Module importieren
import express from 'express';
import ngrok from 'ngrok';
import fsp from 'fs/promises';

//express app erstellen
const app = express();
const PORT = 3000;

//zufriff erlauben auf public ordner
app.use(express.static(__dirname + '/../public'));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});


app.get('/getData', async (_req, res) => {
    try {
        const data = await fsp.readFile(__dirname + '/../data/data.json', 'utf-8');
        res.send(JSON.parse(data));
    } catch (err) {
        res.status(500).send({ success: false, error: err });
    }
});

app.post('/addData', async (req, res) => {
    try {
        await fsp.writeFile(__dirname + '/../data/data.json', JSON.stringify(req.body, null, 4), 'utf-8');
        res.status(200).send({ success: true });
    } catch (err) {
        res.status(500).send({ success: false, error: err });
    }
});


app.get('/getEntrys', async (_req, res) => {
    try {
        const data = await fsp.readFile(__dirname + '/../data/entrys.json', 'utf-8');
        res.send(JSON.parse(data));
    } catch (err) {
        res.status(500).send({ success: false, error: err });
    }
});

app.post('/addEntrys', async (req, res) => {
    try {
        await fsp.writeFile(__dirname + '/../data/entrys.json', JSON.stringify(req.body, null, 4), 'utf-8');
        res.status(200).send({ success: true });
    } catch (err) {
        res.status(500).send({ success: false, error: err });
    }
});


app.get('/getStats', async (_req, res) => {
    try {
        const data = await fsp.readFile(__dirname + '/../data/exerciseStats.json', 'utf-8');
        res.send(JSON.parse(data));
    } catch (err) {
        res.status(500).send({ success: false, error: err });
    }
});

app.post('/addStats', async (req, res) => {
    try {
        await fsp.writeFile(__dirname + '/../data/exerciseStats.json', JSON.stringify(req.body, null, 4), 'utf-8');
        res.status(200).send({ success: true });
    } catch (err) {
        res.status(500).send({ success: false, error: err });
    }
});






//NGROK
(async function() {
    
    const url = await ngrok.connect({
      authtoken: '2sw3v9KUgzYZRJxfnmxj9gQbHbj_7Jp99JMNNjYyBNw2N8YzP',
      addr: PORT
    });
    console.log('******** ngrok Tunnel offen ********');
    console.log(url);
    console.log('');
  })();