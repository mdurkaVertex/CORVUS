import logicRegistry from './initLogicRegistry';

export default class FlowEngine {
  constructor(nodes, edges, setNodes) {
    this.nodes = nodes;
    this.edges = edges;
    this.setNodes = setNodes;
  }

  getNodeById(id) {
    return this.nodes.find((n) => n.id === id);
  }

  async executeFrom(startNodeId) {
    let currentId = startNodeId;

    while (currentId) {
      const node = this.getNodeById(currentId);
      const LogicClass = logicRegistry.getLogic(node.type);

      if (!LogicClass) {
        console.warn(`No logic class for node type: ${node.type}`);
        break;
      }

      const logic = new LogicClass({
        id: node.id,
        data: node.data,
        edges: this.edges,
        nodes: this.nodes,
      });

      const output = await logic.execute();
      const nextId = logic.getNextNodeId();

      // aktualizacja danych node'a docelowego
      this.setNodes((prev) =>
        prev.map((n) =>
          n.id === nextId
            ? { ...n, data: { ...n.data, output } }
            : n
        )
      );

      currentId = nextId;
    }
  }
}
