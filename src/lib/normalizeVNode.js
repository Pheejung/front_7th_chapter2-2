export function normalizeVNode(vNode) {
  if (vNode == null || typeof vNode === "boolean") {
    return "";
  }

  if (typeof vNode === "number") {
    return String(vNode);
  }

  if (typeof vNode === "string") {
    return vNode;
  }

  if (Array.isArray(vNode)) {
    return vNode
      .map(normalizeVNode)
      .filter((child) => child !== "" && child != null);
  }

  if (typeof vNode.type === "function") {
    const props = {
      ...vNode.props,
      children: vNode.children.length > 0 ? vNode.children : undefined,
    };

    const result = vNode.type(props);

    return normalizeVNode(result);
  }

  return {
    ...vNode,
    children: vNode.children
      .map(normalizeVNode)
      .filter((child) => child !== "" && child != null),
  };
}
