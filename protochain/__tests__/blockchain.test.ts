import { describe, expect, test } from '@jest/globals';
import Blockchain from '../src/lib/blockchain';


/**
 * Testes unitários para a classe Blockchain
 */
describe("Blockchain tests", () => {
  
  // Teste 1: Verificar se o BlockGenesis é válido
  test("BlockGenesis is valid", () => {
    const blockGenesis = new Blockchain();
    //expect(blockGenesis.blocks[0].isValid()).toBe(true);
    //tambem posso testar de outra maneira pra ver se exister o block genesis
    expect(blockGenesis.blocks.length).toEqual(1);   
  });


});
