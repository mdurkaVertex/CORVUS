export default class BaseNodeLogic {
  constructor({ id, data, edges = [], nodes = [] }) {
    this.id = id;
    this.data = data;
    this.edges = edges;
    this.nodes = nodes;
  }

  /**
   * Zwraca ID wszystkich node'ów, do których ten node prowadzi (wyjścia).
   */
  getNextNodeIds() {
    return this.edges
      .filter((edge) => edge.source === this.id)
      .map((edge) => edge.target);
  }

  /**
   * Zwraca dane wyjściowe z pierwszego node'a wejściowego (pierwszy input).
   * W przyszłości można dodać tryb agregacji.
   */
  getInputData() {
    const inputEdge = this.edges.find((edge) => edge.target === this.id);
    if (!inputEdge) return null;

    const sourceNode = this.nodes.find((node) => node.id === inputEdge.source);
    return sourceNode?.data?.output ?? null;
  }

  /**
   * Ustawia dane wyjściowe i propaguje je do następnych node’ów.
   */
  setOutputData(output) {
    this.data.output = output;

    const nextNodeIds = this.getNextNodeIds();
    for (const nodeId of nextNodeIds) {
      const nextNode = this.nodes.find((node) => node.id === nodeId);
      if (nextNode) {
        nextNode.data.input = output;
      }
    }
  }

  /**
   * Główna metoda wykonawcza – do nadpisania przez klasy potomne.
   */
  async execute() {
    throw new Error(`Node logic for "${this.id}" has no execute() implementation.`);
  }

  /**
   * Walidacja konfiguracji – opcjonalna. Zwraca null lub string z błędem.
   */
  validate() {
    return null;
  }
}
