import SHA256 from 'crypto-js/sha256'; 
import Validation from './validation';
/**
 * Block class
*/
export default class Block {
  public index: number;
  public timestamp: number;
  public hash: string;
  public previousHash: string;
  public data: string;

  /**
   * @param block: Block
   * @returns Block
   * 
   */

  constructor(block?: Block) {
    this.index = block?.index || 0;
    this.timestamp = block?.timestamp || Date.now();
    this.previousHash = block?.previousHash || '';
    this.data = block?.data || '';  
    this.hash = block?.hash || this.getHash();

  }

  // getHash method
  // returns the hash of the block created
  getHash(): string {
    return SHA256(
      this.index + this.data + this.timestamp + this.previousHash
    ).toString();
  }

  // isValid method

  isValid(previousHash:string, previousIndex: number): Validation {
    if (previousIndex !== this.index -1) return new Validation(false, 'Invalid index');
    if (this.hash !== this.getHash()) return new Validation(false, 'Invalid hash');
    if (!this.data) return new Validation(false, 'Invalid date');
    if (this.timestamp < 1) return new Validation(false, 'Invalid timestamp');
    if (this.previousHash !== previousHash) return new Validation(false, 'Invalid previousHash');
    return new Validation();
  }
  


}


/**
 * install crypto-js
 * npm install crypto-js
 * npm i -D @types/crypto-js
 * 
 */