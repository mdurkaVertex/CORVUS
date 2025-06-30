import logicRegistry from './initLogicRegistry';

export default class FlowEngine {
  constructor(nodes, edges, setNodes) {
    this.nodes = nodes;
    this.edges = edges;
    this.setNodes = setNodes;
    this.executedNodes = new Set(); // 🧠 zapobiegamy wielokrotnemu wykonaniu
  }

  getNodeById(id) {
    return this.nodes.find((n) => n.id === id);
  }

  async executeFrom(startNodeId) {
    if (!startNodeId || this.executedNodes.has(startNodeId)) return;
    this.executedNodes.add(startNodeId);

    // 🟡 Set status to "executing"
    this.setNodes((prev) =>
      prev.map((n) =>
        n.id === startNodeId ? { ...n, data: { ...n.data, status: 'executing' } } : n
      )
    );

    await new Promise((r) => setTimeout(r, 100)); // mikro delay

    const node = this.getNodeById(startNodeId);
    const LogicClass = logicRegistry.getLogic(node.type);

    if (!LogicClass) {
      console.warn(`⚠ No logic class found for type "${node.type}"`);
      this.setNodes((prev) =>
        prev.map((n) =>
          n.id === startNodeId ? { ...n, data: { ...n.data, status: 'error' } } : n
        )
      );
      return;
    }

    const logic = new LogicClass({
      id: node.id,
      data: node.data,
      edges: this.edges,
      nodes: this.nodes,
    });

    let output;
    try {
      output = await logic.execute();

      // 🟢 Success
      this.setNodes((prev) =>
        prev.map((n) =>
          n.id === startNodeId ? { ...n, data: { ...n.data, status: 'success', output } } : n
        )
      );
    } catch (err) {
      console.error(`❌ Error in node ${startNodeId}:`, err);
      this.setNodes((prev) =>
        prev.map((n) =>
          n.id === startNodeId
            ? {
                ...n,
                data: {
                  ...n.data,
                  status: 'error',
                  output: err.message || 'Execution failed',
                },
              }
            : n
        )
      );
      return;
    }

    // 🔄 Get all connected targets
    const nextIds = this.edges
      .filter((e) => e.source === startNodeId)
      .map((e) => e.target);

    for (const nextId of nextIds) {

      console.log(`➡️ Sending output from ${startNodeId} to ${nextId}:`, output);

      this.setNodes((prev) =>
        prev.map((n) =>
          n.id === nextId ? { ...n, data: { ...n.data, input: output } } : n
        )
      );

      await this.executeFrom(nextId);
    }
  }
}
