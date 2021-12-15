export const sum = (a: number, b: number) => a + b;
export const multiply = (a: number, b: number) => a * b;
export const subtract = (a: number, b: number) => a - b;
export const divide = (a: number, b: number) => a / b;


export type ActionType = {
  type: 'SUM' | 'MUL' | 'SUB' | 'DIV' | 'EXP'
  number: number
}

export const calculator = (state: number, action: ActionType) => {
  switch (action.type) {
    case 'SUM':
      return state + action.number;
    case 'MUL':
      return state * action.number;
    case 'SUB':
      return state - action.number;
    case 'DIV':
      return state / action.number;
    case 'EXP':
      return state ** action.number;
    default:
      return state;
  }
};