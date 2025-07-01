import BaseNodeLogic from './BaseNodeLogic';

export default class SetNodeLogic extends BaseNodeLogic {
  async execute() {
    const variables = this.data.variables || [];

    // Budujemy output jako obiekt
    const result = {};
    for (const v of variables) {
      if (!v.name) continue;
      let value = v.value;
      if (v.type === 'number') value = parseFloat(value);
      if (v.type === 'boolean') value = value === 'true' || value === true;
      result[v.name] = value;
    }

    this.setOutputData(result); 
    return result;
  }

  validate() {
    return null;
  }
}
