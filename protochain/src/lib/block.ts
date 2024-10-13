
import SHA256 from 'crypto-js/sha256'; 
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
   * 
   * @param index // index of the block
   * @param previousHash // hash of the previous block
   * @param data // data of the block
   */

  constructor(
    index: number,
    previousHash: string,
    data: string,
  ) {
    this.index = index;
    this.timestamp = Date.now();
    this.previousHash = previousHash;
    this.data = data;
    this.hash = this.getHash();

  }

  // getHash method
  // returns the hash of the block created
  getHash(): string {
    return SHA256(
      this.index + this.data + this.timestamp + this.previousHash
    ).toString();
  }

  // isValid method
  isValid(): boolean {
    if (this.index < 0) return false;
    if (!this.hash) return false;
    if (!this.data) return false;
    if (this.timestamp < 1) return false;
    if (!this.previousHash) return false;
    return true;
  }
  


}


/**
 * install crypto-js
 * npm install crypto-js
 * npm i -D @types/crypto-js
 * 
 */