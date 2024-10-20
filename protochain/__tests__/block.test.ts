import { beforeAll, describe, expect, test } from '@jest/globals';
import Block from '../src/lib/block';

describe("Block tests", () => {

  let  genesis: Block;
  
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
    const valid = block.isValid(genesis.hash, genesis.index);
    expect(valid.success).toBeTruthy();
  });

  test("Should NOT be valid (fallbacks)", () => {
    const block = new Block();
    const valid = block.isValid(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });
  


  test("Block is invalid (previous hash) ", () => {
    const block = new Block({
      index: 1,
      previousHash: "adcv",
      data: "block 2"
    } as Block);
    const valid = block.isValid(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });

  // Teste 3: Verificar se o index é inválido
  test("Should NOT be valid (index)", () => {
    const block = new Block({
      index: -1,
      previousHash: genesis.hash,
      data: "block 2"
    } as Block);
    const valid = block.isValid(genesis.hash, genesis.index);
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
    const valid = block.isValid(genesis.hash, genesis.index);
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
    const valid = block.isValid(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });
  
  // Teste 6: Verificar se o data é inválido
  test("Should NOT be valid (data)", () => {
    const block = new Block({
      index: -1,
      previousHash: genesis.hash,
      data: "block 2"
    } as Block);
    const valid = block.isValid(genesis.hash, genesis.index);
    expect(valid.success).toEqual(false);  
  });

});

