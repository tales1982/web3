import Block from "./block";
import Validation from "../validation";

export default class Blockchain {
    blocks: Block[];
    nextIndex: number = 0;
    
    constructor() {
        this.blocks = [new Block(
            {
                index: 0,
                hash: "abc",
                previousHash: "",
                data: 'Genesis block',
                timestamp: Date.now(),
            } as Block
        )];
        this.nextIndex = 1;
    }

    // getLastBlock method
    // returns the last block in the blockchain
    getLastBlock(): Block {
        return this.blocks[this.blocks.length - 1];
    }

    // addBlock method
    // adds a block to the blockchain
    addBlock(block: Block): Validation {
    if(block.index < 0) return new Validation(false, `Block ${block.index} is invalid`);
        this.blocks.push(block);
        this.nextIndex++;
        return new Validation();    
    }

    getBlock(hash: string): Block | undefined {
        return this.blocks.find(b => b.hash === hash) || undefined;
    }

    // isValid method
    // checks if the blockchain is valid
    isVAlid(): Validation {

        return new Validation();
    }

}