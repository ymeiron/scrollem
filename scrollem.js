var pointer = 0;
var elements;
var presentationMode = true;

function startScrollem() {
  elements = Array.from(document.querySelectorAll('p,li'))

  wrapLiText(elements)

  div = document.createElement('div')
  div.innerHTML = 'P'
  div.style.cssText = 'position: fixed; top: 0px; left: 1rem; font-family: sans-serif, Arial, Helvetica; font-size: 4rem; color: #151B8D';
  div.id = 'scrollem-mode'
  div.style['opacity'] = 0
  document.body.appendChild(div);

  setHighlight(getElement(pointer))

  document.addEventListener('keydown', (event) => {
    if ((event.key === 'p') || (event.key === 'P')) {
      if (presentationMode) {
        presentationMode = false
        animatePresentationMode('N')
        unsetHighlight(getElement(pointer))
        return
      }
      presentationMode = true
      animatePresentationMode('P')
      setHighlight(getElement(pointer))
      return
    }

    if (!presentationMode) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (pointer === elements.length - 1) return
      unsetHighlight(getElement(pointer))
      pointer++
      setHighlight(getElement(pointer))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (pointer === 0) return
      unsetHighlight(getElement(pointer))
      pointer--
      setHighlight(getElement(pointer))
    }
  })

  document.addEventListener('click', (event) => {
    if (!presentationMode) return

    event.preventDefault()

    let target = event.target
    let i = elements.indexOf(target)

    while (i === -1) {
      target = target.parentElement
      if (target === null) return
      i = elements.indexOf(target)
    }

    unsetHighlight(getElement(pointer))
    pointer = i
    setHighlight(getElement(pointer))
  })
}

function animatePresentationMode(content) {
  let modeDiv = document.getElementById('scrollem-mode')
  if (content !== undefined) modeDiv.innerHTML = content
  modeDiv.animate([
    { opacity: 0 },
    { opacity: 1, offset: 0.15 },
    { opacity: 0 }
  ], {
    duration: 1000,
    iterations: 1
  });
}

function wrapLiText(elements) {
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i]
    if (
      (element.tagName === 'LI') &&
      (element.firstChild.tagName != 'UL') &&
      (element.getElementsByTagName('ul').length > 0)
    ) {
      let li = document.createElement('li')
      let div = document.createElement('div')
      for (const child of element.childNodes) {
        if (child.nodeType === 3) div.innerHTML += child.textContent
        else if (child.tagName != 'UL') div.innerHTML += child.outerHTML
        else {
          if (div.innerHTML != '') {
            li.appendChild(div)
            div = document.createElement('div')
          }
          li.appendChild(child)
        }
      }
      if (div.innerHTML != '') li.appendChild(div)
      element.replaceWith(li)
      elements[i] = li.firstChild
    }
  }
}

function getElement(pointer) {
  return elements[pointer]
}

function setHighlight(element) {
  element.style['background-color'] = '#ffff77'
  element.style['border-radius'] = '0px 15px 15px 0px'
}
function unsetHighlight(element) {
  element.style['background-color'] = ''
  element.style['border-radius'] = ''
}

startScrollem()