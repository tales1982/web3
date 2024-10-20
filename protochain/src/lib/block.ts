import SHA256 from "crypto-js/sha256";
import Validation from "./validation";
/**
 * Block class
 */
export default class Block {
  public index: number;
  public timestamp: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public nonce: number;
  public miner: string;

  /**
   * @param block: Block
   * @param previousHash: the previous block hash
   * @param previousIndex: the previous block index
   * @param difficulty: the difficulty of the blockchain
   * @returns Validation
   *
   *
   */

  constructor(block?: Block) {
    this.index = block?.index || 0;
    this.timestamp = block?.timestamp || Date.now();
    this.previousHash = block?.previousHash || "";
    this.data = block?.data || "";
    this.hash = block?.hash || this.getHash();
    this.nonce = block?.nonce || 0;
    this.miner = block?.miner || "";
  }

  // getHash method
  // returns the hash of the block created
  getHash(): string {
    return SHA256(
      this.index +
        this.data +
        this.timestamp +
        this.previousHash +
        this.nonce +
        this.miner
    ).toString();
  }

  /**
   * mines the block
   * returns the mined block
   * @param difficulty  the difficulty of the blockchain
   * @param miner the miner of the blockchain
   */
  mine(difficulty: number, miner: string) {
    this.miner = miner;
    const prefix = Array(difficulty + 1).join("0");

    do {
      this.nonce++;
      this.hash = this.getHash();
    } while (!this.hash.startsWith(prefix));
  }

  // isValid method
  isValid(
    previousHash: string,
    previousIndex: number,
    difficulty: number
  ): Validation {
    if (previousIndex !== this.index - 1)
      return new Validation(false, "Invalid index");
    if (!this.data) return new Validation(false, "Invalid date");
    if (this.timestamp < 1) return new Validation(false, "Invalid timestamp");
    if (this.previousHash !== previousHash)
      return new Validation(false, "Invalid previousHash");
    if (!this.nonce || !this.miner)
      return new Validation(false, "Invalid nonce or miner");

    const prefix = Array(difficulty + 1).join("0");
    if (this.hash !== this.getHash() || !this.hash.startsWith(prefix))
      return new Validation(false, "Invalid hash");
    return new Validation();
  }
}

/**
 * install crypto-js
 * npm install crypto-js
 * npm i -D @types/crypto-js
 *
 */
