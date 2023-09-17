function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => 
        typeof child === 'object'
          ? child
          : createTextElement(child)  
      )
    }
  }
}

function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);
  const isProperty = key => key !== "children"
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  element.props.children.forEach(child => render(child, dom))
  container.appendChild(dom);
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

const Didact = {
  createElement,
  render,
}

const element = Didact.createElement(
  'div',
  { id: 'foo'},
  Didact.createElement('h1', null, 'bar'),
  Didact.createElement('b')
)
const container = document.getElementById('root');
Didact.render(element, container);