import { addEvent } from "./eventManager";

const BOOLEAN_PROPS = new Set(["checked", "disabled", "selected", "readOnly"]);

export function createElement(vNode) {
  if (vNode && typeof vNode.type === "function") {
    throw new Error(
      "함수형 컴포넌트는 createElement로 직접 변환할 수 없습니다. normalizeVNode를 먼저 사용하세요.",
    );
  }

  if (vNode == null || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(String(vNode));
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      fragment.appendChild(createElement(child));
    });
    return fragment;
  }

  const $el = document.createElement(vNode.type);

  updateAttributes($el, vNode.props);

  vNode.children.forEach((child) => {
    if (child == null) return;
    $el.appendChild(createElement(child));
  });

  return $el;
}

function updateAttributes($el, props) {
  if (!props) return;

  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith("on") && typeof value === "function") {
      const eventType = key.slice(2).toLowerCase();
      addEvent($el, eventType, value);
    } else if (key === "className") {
      $el.setAttribute("class", value);
    } else if (BOOLEAN_PROPS.has(key)) {
      $el[key] = value;
    } else {
      $el.setAttribute(key, value);
    }
  });
}
