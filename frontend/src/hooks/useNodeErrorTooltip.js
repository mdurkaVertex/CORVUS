export default function useNodeErrorTooltip(id, data) {
  if (!data?.status || data.status !== 'error') return { title: '' };

  const errorMessage = data.output || `Node ${id} failed.`;
  return { title: errorMessage };
}
