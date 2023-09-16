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

function createDom(fiber) {
   const {
    type,
    props,
  } = fiber;

  const dom = type === 'TEXT_ELEMENT' ? document.createTextNode(props.nodeValue) : document.createElement(type);
  Object.keys(props)
    .forEach(name => {
      if (name !== 'children') {
        dom[name] = props[name];
      }
    });
  return dom;
}

function render(element, container) {
  if (!container) { throw new Error("container not passed")}

  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    }
  }
}

let nextUnitOfWork = null

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }

  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }

  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent;
  }
}

const element = Didact.createElement(
  'div',
  { id: 'foo' },
  Didact.createElement('a', { className: 'yada' }, 'bar'),
  Didact.createElement('b')
);
const container = document.getElementById('root')
Didact.render(element, container);