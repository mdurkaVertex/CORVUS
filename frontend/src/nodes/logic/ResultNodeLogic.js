import BaseNodeLogic from './BaseNodeLogic';

export default class ResultNodeLogic extends BaseNodeLogic {
  async execute() {
    const input = this.getInputData();
    console.log(`🟢 ResultNode (${this.id}) output:`, input);
    return input; // zwracamy dane — na wypadek dalszego łańcucha
  }

  validate() {
    return null; // zawsze poprawny
  }
}
