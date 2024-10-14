import Block from "./block";

export default class Blockchain {
    blocks: Block[];
    nextIndex: number = 0;
    
    constructor() {
        this.blocks = [new Block(0, "", "Genesis Block")];
        this.nextIndex = 1;
    }

    // getLastBlock method
    // returns the last block in the blockchain
    getLastBlock(): Block {
        return this.blocks[this.blocks.length - 1];
    }

    // addBlock method
    // adds a block to the blockchain
    addBlock(block: Block): boolean {
        const lastBlock = this.getLastBlock();

        if(!block.isValid(lastBlock.hash, lastBlock.index)) return false;
        this.blocks.push(block);
        this.nextIndex++;
        return true;
    }

    // isValid method
    // checks if the blockchain is valid
    isVAlid(): boolean {
        for(let i = this.blocks.length - 1; i > 0; i--) {
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i - 1];
            const isValid = currentBlock.isValid(previousBlock.hash, previousBlock.index);
            if(!isValid) return false;
        }
        return true;
    }

}