import Validation from "../validation";
/**
 * mocked Block class
 */
export default class Block {
  public index: number;
  public timestamp: number;
  public hash: string;
  public previousHash: string;
  public data: string;

  /**
   * @param block: mocked Block
   * @returns mocked Block
   *
   */

  constructor(block?: Block) {
    this.index = block?.index || 0;
    this.timestamp = block?.timestamp || Date.now();
    this.previousHash = block?.previousHash || "";
    this.data = block?.data || "";
    this.hash = block?.hash || this.getHash();
  }

  getHash(): string {
    return this.hash || "abcdef";
  }

  isValid(previousHash: string, previousIndex: number): Validation {
    if (!previousHash || previousIndex < 0)
      return new Validation(false, "Invalid index");
    return new Validation();
  }
}
