import { beforeAll, describe, expect, test } from '@jest/globals';
import Block from '../src/lib/block';

describe("Block tests", () => {

  const exampleDifficulty = 0;
  let  genesis: Block;
  const exempleMiner = "miner";
  
  beforeAll(() => {
    genesis = new Block({
      data: "Genesis Block",
    } as Block);
  });
  

  test("Should be valid", () => {
    const block = new Block({
      index: 1,
      previousHash: genesis.hash,
      data: "block 2"
    } as Block);
    block.mine(exampleDifficulty, exempleMiner);
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toEqual(true);
  });

  test("Should NOT be valid (fallbacks)", () => {
    const block = new Block();
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();
  });
  


  test("Block is invalid (previous hash) ", () => {
    const block = new Block({
      index: 1,
      previousHash: "adcv",
      data: "block 2"
    } as Block);
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();
  });

  // Teste 3: Verificar se o index é inválido
  test("Should NOT be valid (index)", () => {
    const block = new Block({
      index: -1,
      previousHash: genesis.hash,
      data: "block 2"
    } as Block);
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();  
  });
  
  // Teste 4: Verificar se o timestamp é inválido
  test("Should NOT be valid (timestamp)", () => {
    const block = new Block({
      index: 1,
      previousHash: genesis.hash,
      data: "block 2"
    } as Block);
    block.timestamp = -1;
    block.hash = block.getHash();
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();  
  });
  
  // Teste 5: Verificar se o hash é inválido
  test("Should NOT be valid (hash)", () => {
    const block = new Block({
      index: 1,
      previousHash: genesis.hash,
      data: ""
    } as Block);
    block.hash = "";
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();
  });

  test("Should NOT be valid (empty hash)", () => {
    const block = new Block({
      index: 1,
      previousHash: genesis.hash,
      data: "Block 2"
    } as Block);
    block.mine(exampleDifficulty, exempleMiner);
    block.hash = "";
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();
  });
  
  
  test("Should NOT be valid (data)", () => {
    const block = new Block({
      index: -1,
      previousHash: genesis.hash,
      data: "block 2"
    } as Block);
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toEqual(false);  
  });

  test("Should NOT be valid (miner)", () => {
    const block = new Block({
      index: 1,
      previousHash: genesis.hash,
      data: "block 2"
    } as Block);
    block.miner = "";
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();
  });

});

