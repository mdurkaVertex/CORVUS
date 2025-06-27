export default class NodeLogicRegistry {
  constructor() {
    this.registry = {};
  }

  register(type, logicClass) {
    this.registry[type] = logicClass;
  }

  getLogic(type) {
    return this.registry[type] || null;
  }

  validateAll(nodes) {
  return nodes
    .map((node) => {
      const logicClass = this.getLogic(node.type);
      if (!logicClass) {
        return { valid: false, error: `No logic for node type: ${node.type}` };
      }

      const logic = new logicClass({ id: node.id, data: node.data });
      const result = logic.validate();

      // jeśli brak obiektu (np. null/undefined) → uznaj za poprawny
      if (!result || typeof result !== 'object') return { valid: true };

      return result;
    })
    .filter((res) => !res.valid);
}

}
