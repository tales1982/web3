import { describe, expect, test } from '@jest/globals';
import Block from '../src/lib/block';
import Blockchain from '../src/lib/blockchain';

describe("Blockchain tests", () => {

  // Teste 1: Verificar se o BlockGenesis é válido
  test("Should has genesis blocks", () => {
    const blockGenesis = new Blockchain();
    expect(blockGenesis.blocks.length).toEqual(1);
  });

  // Teste 2: Verificar se o BlockGenesis é válido
  test("Block is valid (genesis)", () => {
    const blockGenesis = new Blockchain();
    expect(blockGenesis.isVAlid()).toBe(true);
  });

  // Teste 3: Adicionar um bloco válido
  test("Should be valid (two blocks)", () => {
    const blockGenesis = new Blockchain();
    const block = new Block(1, blockGenesis.blocks[0].hash, "block 2");
    blockGenesis.addBlock(block);
    expect(blockGenesis.isVAlid()).toBe(true);
  });

  // Teste 4: Não deve adicionar um bloco inválido
  test("Should NOT add Block", () => {
    const blockGenesis = new Blockchain();
    const invalidBlock = new Block(-1, blockGenesis.blocks[0].hash, "block 2");
    const result = blockGenesis.addBlock(invalidBlock);
    expect(result).toEqual(false);
  });

  // Teste 5: Verificar se o BlockGenesis é válido
  test("Should NOT be valid",()=>{
    const blockGenesis = new Blockchain();
    blockGenesis.addBlock(new Block(1, blockGenesis.blocks[0].hash, "block 2"));
    blockGenesis.blocks[1].data = "A envia 10 par B";
    expect(blockGenesis.isVAlid()).toEqual(false);
  })

});
