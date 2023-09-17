// const Didact = {
//   createElement,
//   render,
// }

// function createElement(type, props, ...children) {
//   return {
//     type,
//     props: {
//       ...props,
//       children: children.map(child => 
//         typeof child === "object" ? child : createTextElement(child)  
//       )
//     },
//   };
// }

// function createTextElement(text) {
//   return {
//     type: 'TEXT_ELEMENT',
//     props: {
//       nodeValue: text,
//       children: [],
//     }
//   }
// }

// function createDom(fiber) {
//    const {
//     type,
//     props,
//   } = fiber;

//   const dom = type === 'TEXT_ELEMENT' ? document.createTextNode(props.nodeValue) : document.createElement(type);
//   Object.keys(props)
//     .forEach(name => {
//       if (name !== 'children') {
//         dom[name] = props[name];
//       }
//     });
//   return dom;
// }

// function commitRoot() {
//   deletions.forEach(commitWork)
//   commitWork(wipRoot.child);
//   currentRoot = wipRoot;
//   wipRoot = null;
// }

// const isEvent = key => key.startsWith('on')
// const isProperty = key => key !== 'children'
// const isNew = (prev, next) => key =>
//   prev[key] !== next[key]
//   const isGone = (prev, next) => key => !(key in next)

// function updateDom(dom, prevProps, nextProps) {
//   debugger
//   // Remove old or changed event listeners
//   Object.keys(prevProps)
//     .filter(isEvent)
//     .filter(
//       key =>
//         !(key in nextProps) || isNew(prevProps, nextProps)(key)
//     )
//     .forEach(name => {
//       const eventType = name.toLowerCase().substring(2);
//       dom.removeEventListener(eventType, prevProps[name])
//     })
//   // Add event listeners
//   Object.keys(nextProps)
//     .filter(isEvent)
//     .filter(isNew(prevProps, nextProps))
//     .forEach(name => {
//       const eventType = name.toLowerCase().substring(2);
//       dom.addEventListener(eventType, nextProps[name])
//     })

//   // Remove old properties
//   Object.keys(prevProps)
//     .filter(isProperty)
//     .filter(isGone(prevProps, nextProps))
//     .forEach(name => {
//       dom[name] = ""
//     })

//   // Set new properties
//   Object.keys(prevProps)
//     .filter(isProperty)
//     .filter(isNew(prevProps, nextProps))
//     .forEach(name => {
//       dom[name] = nextProps[name]
//     })
// }

// function commitWork(fiber) {
//   if (!fiber) { return }
//   debugger
//   const domParent = fiber.parent.dom;
//   if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
//     domParent.appendChild(fiber.dom)
//   } else if (fiber.effectTag === 'DELETION') {
//     domParent.removeChild(fiber.dom)
//   } else if (
//     fiber.effectTag === 'UPDATE' && fiber.dom !== null
//   ) {
//     updateDom(fiber.dom, fiber.alternate.props, fiber.props)
//   }
//   commitWork(fiber.child)
//   commitWork(fiber.sibling)
// }

// function render(element, container) {
//   if (!container) { throw new Error("container not passed")}

//   wipRoot = {
//     dom: container,
//     props: {
//       children: [element],
//     },
//     alternate: currentRoot,
//   }
//   deletions = [];
//   nextUnitOfWork = wipRoot;
// }

// let nextUnitOfWork = null;
// let wipRoot = null;
// let currentRoot = null;
// let deletions = null;

// function workLoop(deadline) {
//   let shouldYield = false
//   while (nextUnitOfWork && !shouldYield) {
//     nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
//     shouldYield = deadline.timeRemaining() < 1
//   }

//   if (!nextUnitOfWork && wipRoot) {
//     commitRoot();
//   }
//   requestIdleCallback(workLoop)
// }

// requestIdleCallback(workLoop)

// function performUnitOfWork(fiber) {
//   if (!fiber.dom) {
//     fiber.dom = createDom(fiber);
//   }

//   const elements = fiber.props.children;
//   reconcileChildren(fiber, elements);

//   if (fiber.child) {
//     return fiber.child;
//   }
//   let nextFiber = fiber;
//   while (nextFiber) {
//     if (nextFiber.sibling) {
//       return nextFiber.sibling
//     }
//     nextFiber = nextFiber.parent;
//   }
// }

// function reconcileChildren(wipFiber, elements) {
//   let index = 0;
//   let oldFiber = wipFiber.alternate && wipFiber.alternate.child
//   let prevSibling = null;

//   while (index < elements.length || oldFiber !== null) {
//     const element = elements[index];

//     let newFiber = null;
//     const sameType = oldFiber && element && element.type == oldFiber.type;
//     debugger
//     if (sameType) {
//       newFiber = {
//         type: oldFiber.type,
//         props: element.props,
//         dom: oldFiber.dom,
//         parent: wipFiber,
//         alternate: oldFiber,
//         effectTag: 'UPDATE'
//       }
//     }

//     if (element && !sameType) {
//       newFiber = {
//         type: element.type,
//         props: element.props,
//         dom: null,
//         parent: wipFiber,
//         alternate: null,
//         effectTag: 'PLACEMENT',
//       }
//     }

//     if (oldFiber && !sameType) {
//       oldFiber.effectTag = 'DELETION',
//       deletions.push(oldFiber)
//     }

//     if (oldFiber) {
//       oldFiber = oldFiber.sibling;
//     }

//     if (index === 0) {
//       wipFiber.child = newFiber;
//     } else if (prevSibling) {
//       prevSibling.sibling = newFiber;
//     }

//     prevSibling = newFiber;
//     index++;
//   }
// }

// const element = Didact.createElement(
//   'div',
//   { id: 'foo' },
//   Didact.createElement('a', { className: 'yada' }, 'bar'),
//   Didact.createElement('b')
// );
// const container = document.getElementById('root')
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}

function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);

  return dom;
}

const isEvent = (key) => key.startsWith("on");
debugger;
const isProperty = (key) => key !== "children" && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);
function updateDom(dom, prevProps, nextProps) {
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  const domParent = fiber.parent.dom;
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null;
let deletions = null;

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);

  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type == oldFiber.type;

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE"
      };
    }
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT"
      };
    }
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

const Didact = {
  createElement,
  render
};

/** @jsx Didact.createElement */
const container = document.getElementById("root");

const updateValue = (e) => {
  rerender(e.target.value);
};

// const rerender = (value) => {
//   const element = (
//     <div>
//       <input onInput={updateValue} value={value} />
//       <h2>Hello {value}</h2>
//     </div>
//   );
//   Didact.render(element, container);
// };

// rerender("World");


const rerender = value => {
  // const udpateValue = e => {
  //   rerender(e.target.value)
  // }
  // const element = (
  //   <div>
  //     <input onInput={updateValue} value={value}></input>
  //     <h2>Hello {value}</h2>
  //   </div>
  // )
  const element = Didact.createElement(
  'div',
    { id: 'foo' },
    Didact.createElement('input', { oninput: e => {
      rerender(e.target.value)
    }, innerText: value }, 'bar'),
    Didact.createElement('h2', { innerText: value })
  );
  Didact.render(element, container);
}

rerender("world")
