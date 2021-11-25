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


test('result of calculating should be right', () => {

  const state = 10;

  const action: ActionType = {
    type: 'SUM',
    number: 20
  }
  const result = calculator(state, action);

  expect(result).toBe(30);
})