interface chartPosition {
  chartId: string;
  containerId: string;
}

interface containerState {
  container: chartPosition;
}

export { chartPosition, containerState };
