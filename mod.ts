/** All possible values for a JSX child */
type Child = string | number | boolean | Node | null | undefined;

/** A unique identifier used by JSX compilation as `React.Fragment` which is used to create document fragments */
const Fragment = Symbol("Fragment");

/** A function to append children to a parent element which recursively calls itself for nested children */
const appendChildren = (
  parent: ParentNode,
  children: Iterable<Child | Iterable<Child>>
) => {
  for (const child of children) {
    if (!child) continue;

    // Recursively add all children
    if (typeof child === "object" && Symbol.iterator in child) {
      appendChildren(parent, child);
    }
    // For nodes, simply append
    else if (child instanceof Node) {
      parent.append(child);
    }
    // For literals convert to textNodes and append
    else {
      const textNode = document.createTextNode(String(child));
      parent.append(textNode);
    }
  }
};

/** Creates a DOM element (or fragment) using the `document.createElement` function */
const createElement = (
  type: string | typeof Fragment,
  props: null | { [key: string]: unknown },
  ...children: (Child | Iterable<Child>)[]
): HTMLElement | DocumentFragment => {
  const element =
    type === Fragment
      ? document.createDocumentFragment()
      : document.createElement(type);

  if (props && element instanceof HTMLElement) {
    for (const key in props) {
      if (key.startsWith("on"))
        element.addEventListener(
          key.substring(2).toLowerCase(),
          props[key] as EventListener
        );
      else if (key === "style") Object.assign(element.style, props[key]);
      else Object.assign(element, { [key]: props[key] });
    }
  }

  appendChildren(element, children);
  return element;
};

/** The virtual react object to convert TSX/JSX into DOM elements */
export const React = {
  createElement,
  Fragment,
};
