export default class BaseNodeLogic {
  constructor({ id, data, edges, nodes }) {
    this.id = id;
    this.data = data;
    this.edges = edges || [];
    this.nodes = nodes || [];
  }

  /**
   * Zwraca ID pierwszego node'a docelowego (output).
   */
  getNextNodeId() {
    const edge = this.edges.find((e) => e.source === this.id);
    return edge?.target || null;
  }
  getInputData() {
  const inputEdge = this.edges.find((e) => e.target === this.id);
  if (!inputEdge) return null;

  const sourceNode = this.nodes.find((n) => n.id === inputEdge.source);
  return sourceNode?.data?.output || null;
}


  /**
   * Wykonuje logikę node'a – do nadpisania w klasach potomnych.
   */
  async execute() {
    throw new Error(`Node logic for "${this.id}" has no execute() implementation.`);
  }
}
