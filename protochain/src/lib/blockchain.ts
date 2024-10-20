import Block from "./block";
import Validation from "./validation";

export default class Blockchain {
    blocks: Block[];
    nextIndex: number = 0;
    
    constructor() {
        this.blocks = [new Block(
            {
                index: this.nextIndex,
                previousHash: "",
                data: 'Genesis block'
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
        const lastBlock = this.getLastBlock();

        if(!block.isValid(lastBlock.hash, lastBlock.index)) return new Validation(false, `Block ${block.index} is invalid`);
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
        for(let i = this.blocks.length - 1; i > 0; i--) {
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i - 1];
            const validation = currentBlock.isValid(previousBlock.hash, previousBlock.index);
            if(!validation.success) return new Validation(false, `Block ${currentBlock.index} is invalid: ${validation.message}`);
        }
        return new Validation();
    }

}