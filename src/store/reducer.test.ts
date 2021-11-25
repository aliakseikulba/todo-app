import {ActionType, calculator, sum} from './reducer';

test('sum should be right', () => {

  // 1. Тестовые данные
  const num1 = 10;
  const num2 = 12;


  // 2. Выполнение тестируемого кода
  const result = sum(num1, num2);


  // 3. Сравнение с ожидаемым результатом
  expect(result).toBe(22);

});


test('result of sum should be right', () => {

  const state = 10;

  const action: ActionType = {
    type: 'SUM',
    number: 20
  }
  const result = calculator(state, action);

  expect(result).toBe(30);
})

test('result of multiply should be right', () => {

  const state = 20;

  const action: ActionType = {
    type: 'MUL',
    number: 20
  }
  const result = calculator(state, action);

  expect(result).toBe(400);
})

test('result of subtract should be right', () => {

  const state = 50;

  const action: ActionType = {
    type: 'SUB',
    number: 20
  }
  const result = calculator(state, action);

  expect(result).toBe(30);
})

test('result of dividing should be right', () => {

  const state = 100;
  const action: ActionType = {
    type: 'DIV',
    number: 20
  }

  const result = calculator(state, action);

  expect(result).toBe(5);
})


test('result of exponentiation should be right', () => {

  const state = 10;

  const action: ActionType = {
    type: 'EXP',
    number: 2
  }
  const result = calculator(state, action);

  expect(result).toBe(100);
})