import BaseNodeLogic from './BaseNodeLogic';

export default class DelayNodeLogic extends BaseNodeLogic {
  async execute() {
    const { ms = 1000 } = this.data;

    return new Promise((resolve) => {
      setTimeout(() => resolve(`Opóźnienie ${ms} ms`), ms);
    });
  }
}
