require('dotenv').config();

const express = require('express');
const { database } = require('./db/dbconnect.js');
const app = express();
const crypto = require('crypto');

const collectionname = process.env.DB_COLLECTION_NAME_USER;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.send("Hello, world!");
});

app.post('/api/user/login', async (req, res)=>{

    const id = req.body.id;
    const password = hash(req.body.password);

    const query = {id:id, password:password};

    const options = {
        projection: {_id: 0, id: 1}
    };

    const data = await database.find(collectionname, query, options);

    console.log(data);

    const result = {
        success: data!==null,
        data: data!==null?"로그인 성공":"ID 혹은 비밀번호를 확인해주세요"
    }

    res.header("Access-Control-Allow-Origin", "*");
    res.json(result);
});

app.get('/api/user/idcheck', async (req, res)=>{
    const id = req.query.id;

    const query = { id: id};
    const options = {
        projection: {_id: 0, id: 1}
    }

    const data = await database.find(collectionname, query, options);
    
    if(data.err!==null) throw data;
    
    const result = {
        success: data==null,
        data: data==null?"사용하실 수 있는 ID입니다.":"이미 존재하는 ID입니다."
    };

    res.header("Access-Control-Allow-Origin", "*");
    res.json(result);
});

app.post('/api/user/signup', async (req, res)=>{
    
    const id = req.body.id;
    const password = hash(req.body.password);
    const type = req.body.type;
    const name = req.body.name;
    const no = req.body.no;
    const fex = req.body.fex;
    const category = req.body.category;

    const doc = {
        id: id,
        password: password,
        type: type,
        name: name,
        no: no,
        fex: fex,
        category: category
    };

    const result = await database.insertOne(collectionname, doc);

    res.send(result);
});

app.post('api/user/modify', async (req, res)=>{
    const id = req.body.id;
    const password = hash(req.body.password);
    const fex = req.body.fex;
    const category = req.body.category;

    const query = { id: id }

    const updateDoc = {
        $set: {
            fex: fex,
            category: category
        }
    }

    const result = await database.updateOne(collectionname, query, updateDoc);
});

app.listen(3000, ()=>{
    console.log("Server setart");
});

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}