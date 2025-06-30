import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

export default function useNodeContextMenuHandler(id) {
  const { setNodes, setEdges } = useReactFlow();

  return useCallback(
    (event) => {
      event.preventDefault();
      const confirmed = window.confirm('❗ Czy na pewno usunąć ten node?');
      if (!confirmed) return;

      setNodes((nodes) =>
        nodes
          .filter((n) => n.id !== id) // 🗑 usuwamy kliknięty node
          .map((n) => ({
            ...n,
            data: {
              ...n.data,
              status: undefined,
              input: undefined,
              output: undefined,
            },
          }))
      );

      setEdges((edges) =>
        edges.filter((e) => e.source !== id && e.target !== id)
      );
    },
    [id, setNodes, setEdges]
  );
}
