let nextUnitOfWork = null;
let wipRoot = null;

function commitRoot() {
  commitWork(wipRoot.child)
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) { return }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom)
  // commitWork(fiber.child)
  // commitWork(fiber.sibling)
}

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }

  const elements = fiber.props.children;
  let index = 0
  let prevSibling = null
  while(index < elements.length) {
    const element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }

    // if first child, assign it as a the fiber's child
    if (index === 0) {
      fiber.child = newFiber
    } else {
      // if not first child, it becomes a sibling of the previous fiber
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber;
    index++;
  }

  if (fiber.child) { return fiber.child }
  let nextFiber = fiber;
  while (nextFiber) {
    // Tries to find the uncle node
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object"
          ? child
          : createTextElement(child)
      ),
    },
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

function createDom(element) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)

  const isProperty = key => key !== "children"
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  return dom;
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    }
  }
  nextUnitOfWork = wipRoot
}

const Didact = {
  createElement,
  render,
}

const element = Didact.createElement(
  'div',
  { id: 'foo'},
  Didact.createElement('h1', { id: 'heading' }, 'bar'),
  Didact.createElement('p', { id: 'para' }, 'blah')
)
const container = document.getElementById('root');

Didact.render(element, container);