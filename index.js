const Didact = {
  createElement,
  render,
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => 
        typeof child === "object" ? child : createTextElement(child)  
      )
    },
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    }
  }
}

function render(element, container) {
  const {
    type: elementType,
    props: elementProps,
  } = element;
  if (!container) { throw new Error("container not passed")}
  const node = elementType === 'TEXT_ELEMENT' ? document.createTextNode(element.props.nodeValue) : document.createElement(element.type);
  elementProps.children.forEach(child => render(child, node));
  if (elementProps) {
    debugger
    Object.keys(elementProps).forEach(key => {
      if (key !== 'children') {
        node[key] = elementProps[key];
      }
    });
  }
  container.appendChild(node);
}

const element = Didact.createElement(
  'div',
  { id: 'foo' },
  Didact.createElement('a', { className: 'yada' }, 'bar'),
  Didact.createElement('b')
);
const container = document.getElementById('root')
Didact.render(element, container);