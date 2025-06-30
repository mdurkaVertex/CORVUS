import BaseNodeLogic from './BaseNodeLogic';

export default class DelayNodeLogic extends BaseNodeLogic {
  async execute() {
    const delay = parseInt(this.data.delay, 10) || 1000;
    const input = this.getInputData();

    console.log(`⏳ DelayNode (${this.id}) passing through:`, input);

    await new Promise((res) => setTimeout(res, delay));
    return input;
  }

  validate() {
    return null;
  }
}
