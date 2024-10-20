import express  from "express";
import morgan from "morgan";
import Blockchain from "../lib/blockchain";
import Block from "../lib/block";

const PORT:number = 3000;

const app = express();

if(process.argv.includes("--run"))
    app.use(morgan("tiny"));

app.use(express.json());

const blockchain = new Blockchain();

app.get("/status", (req, res, next) => {
    res.json({
        numberOfBlocks: blockchain.blocks.length,
        lastBlock: blockchain.getLastBlock(),
        isValid: blockchain.getLastBlock()
    });
});

app.get("/block/:indexOrHash", (req, res : any, next) => {
    let block;
    if(/^[0-9]+$/.test(req.params.indexOrHash)) 
        block = blockchain.blocks[parseInt(req.params.indexOrHash)];
    else
        block = blockchain.getBlock(req.params.indexOrHash);
    if(!block) 
        return res.sendStatus(404);
    else 
        return res.json(block);
  
});

app.post("/blocks", (req, res: any, next) => {
if(req.body.data === undefined) return res.sendStatus(422);

const block = new Block(req.body as Block);
const validation = blockchain.addBlock(block);

if(validation.success) 
    res.status(201).json(block);
else
    res.status(400).json(validation);
});

if(process.argv.includes("--run"))
    app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});

export {
    app
}