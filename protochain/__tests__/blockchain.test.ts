import { describe, expect, jest, test } from '@jest/globals';
import Block from '../src/lib/block';
import Blockchain from '../src/lib/blockchain';

jest.mock("../src/lib/block");

describe("Blockchain tests", () => {

  // Teste 1: Verificar se o BlockGenesis é válido
  test("Block is valid (genesis)", () => {
    const blockGenesis = new Blockchain();
    expect(blockGenesis.isVAlid().success).toEqual(true);
  });

  // Teste 2: Adicionar um bloco válido
  test("Should be valid (two blocks)", () => {
    const blockchain = new Blockchain();
    blockchain.addBlock(new Block({
      index: 1,
      previousHash: blockchain.blocks[0].hash,
      data: "block 2"
    }as Block));
    expect(blockchain.isVAlid().success).toEqual(true);
  });

  // Teste 3: Verificar se o BlockGenesis tem blocos
  test("Should has genesis blocks", () => {
    const blockGenesis = new Blockchain();
    expect(blockGenesis.blocks.length).toEqual(1);
  });

  // Teste 4: Não deve adicionar um bloco inválido
  test("Should NOT add Block", () => {
    const blockchain = new Blockchain();
    const invalidBlock = new Block({
      index: -1,
      previousHash: blockchain.blocks[0].hash,
      data: "block 2"
    }as Block);
    const result = blockchain.addBlock(invalidBlock);
    expect(result.success).toEqual(true);
  });

  // Teste 5: Verificar se o BlockGenesis é válido
  test("Should NOT be valid",()=>{
    const blockchain = new Blockchain();
    blockchain.addBlock(new Block({
      index: 1,
      previousHash: blockchain.blocks[0].hash,
      data: "block 2"
    }as Block));
    blockchain.blocks[1].index = -1;
    expect(blockchain.isVAlid().success).toBeTruthy();
  })

  // Teste 6: Verificar se o BlockGenesis é válido
  test("Should NOT be valid",()=>{
    const blockchain = new Blockchain();
    const block = blockchain.getBlock(blockchain.blocks[0].hash);
    expect(block).toBeTruthy();
  })

});



