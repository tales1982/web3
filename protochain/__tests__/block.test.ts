import { describe, expect, test } from '@jest/globals';
import Block from '../src/lib/block';

describe("Block tests", () => {
  
  // Teste 1: Verificar se o BlockGenesis é válido
  test("Block is valid", () => {
    const block = new Block(1,"0000", "block 2");
    const valid = block.isValid();
    expect(valid).toBeTruthy();
  });

  // Teste 2: Verificar se o previous hash é inválido
  test("Block is invalid (previous hash) ", () => {
    const block = new Block(1,"", "block 2");
    const valid = block.isValid();
    expect(valid).toBeFalsy();
  });

  // Teste 3: Verificar se o index é inválido
  test("Should NOT be valid (index)", () => {
    const block = new Block(-1, "0000", "block 2");
    const valid = block.isValid();
    expect(valid).toBeFalsy();  
  });
  
  // Teste 4: Verificar se o timestamp é inválido
  test("Should NOT be valid (timestamp)", () => {
    const block = new Block(1, "0000", "block 2");
    block.timestamp = -1;
    const valid = block.isValid();
    expect(valid).toBeFalsy();  
  });
  
  // Teste 5: Verificar se o hash é inválido
  test("Should NOT be valid (hash)", () => {
    const block = new Block(1, "0000", "block 2");
    block.hash = "";
    const valid = block.isValid();
    expect(valid).toBeFalsy();
  });
  
  // Teste 6: Verificar se o data é inválido
  test("Should NOT be valid (data)", () => {
    const block = new Block(1, "0000", "");
    const valid = block.isValid();
    expect(valid).toBeFalsy();  
  });
  


});
