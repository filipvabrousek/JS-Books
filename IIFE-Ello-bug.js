 
    (function(){
        
    var Ello = { 
S: function S(e) {
  return document.querySelector(e);
},

/*-----------------------------------------------H FUNCTION-------------------------------------*/
render: function R(type, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    type: type,
    props: props || {},
    children: children
  };

},

/*-----------------------------------------------SET BOOLEAN PROP-------------------------------------*/
 setBooleanProp: function (target, name, value) {
  if (value) {
    target.setAttribute(name, value);
    target[name] = true;
  } else {
    target[name] = false;
  }
},

/*-----------------------------------------------REMOVE BOOLEAN PROP AND SMALL-------------------------------------*/
 removeBooleanProp: function(target, name) {
  target.removeAttribute(name);
  target[name] = false;
},

 isEventProp: function(name) {
  return /^on/.test(name);
},

 extractEventName: function(name) {
  return name.slice(2).toLowerCase();
},

 isCustomProp: function(name) {
  return isEventProp(name) || name === 'forceUpdate';
},

/*-----------------------------------------------SET PROP-------------------------------------*/
 setProp:function(target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === 'className') {
    target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    setBooleanProp(target, name, value);
  } else {
    target.setAttribute(name, value);
  }
},

/*-----------------------------------------------REMOVE PROP-------------------------------------*/
 removeProp: function(target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === 'className') {
    target.removeAttribute('class');
  } else if (typeof value === 'boolean') {
    removeBooleanProp(target, name);
  } else {
    target.removeAttribute(name);
  }
},

/*-----------------------------------------------SET PROPS-------------------------------------*/
 setProps: function(target, props) {
  Object.keys(props).forEach(function(name) {
    setProp(target, name, props[name]);
  });
},

/*-----------------------------------------------UPDATE PROP-------------------------------------*/
 updateProp: function(target, name, newVal, oldVal) {
  if (!newVal) {
    removeProp(target, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setProp(target, name, newVal);
  }
},

/*-----------------------------------------------UPDATE PROPS-------------------------------------*/
updateProps: function(target, newProps) {
  var oldProps = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var props = Object.assign({}, newProps, oldProps);
  Object.keys(props).forEach(function(name) {
    updateProp(target, name, newProps[name], oldProps[name]);
  });
},

/*-----------------------------------------------ADD ELS-------------------------------------*/
addEventListeners: function(target, props) {
  Object.keys(props).forEach(function(name) {
    if (isEventProp(name)) {
      target.addEventListener(extractEventName(name), props[name]);
    }
  });
},

/*-----------------------------------------------CREATE ELEMENT-------------------------------------*/
 createElement: function(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  var el = document.createElement(node.type);
  setProps(el, node.props);
  addEventListeners(el, node.props);
  node.children.map(createElement).forEach(el.appendChild.bind(el));
  return el;
},

/*-----------------------------------------------CHANGED-------------------------------------*/
changed: function(node1, node2) {
  return (typeof node1 === 'undefined' ? 'undefined' : _typeof(node1)) !== (typeof node2 === 'undefined' ? 'undefined' : _typeof(node2)) || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type || node1.props && node1.props.forceUpdate;
},

/*-----------------------------------------------UPDATE ELEMENT-------------------------------------*/
 updateElement: function(parent, newNode, oldNode) {
  var index = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
  if (!oldNode) {
    parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    parent.removeChild(parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    
  } else if (newNode.type) {
    updateProps(parent.childNodes[index], newNode.props, oldNode.props);
    
    var newLength = newNode.children.length;
    var oldLength = oldNode.children.length;
    for (var i = 0; i < newLength || i < oldLength; i++) {
      if (window.CP.shouldStopExecution(2)) {
        break;
      }
      
      updateElement(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }
  console.log("Element updated!");
}
}
    
    
    
/*                      EXPOSE FUNCTIONS TO OUTER SCOPE           */
window.Ello = Ello;
})();

/*-----------------------------------------------CUSTOM-------------------------------------*/

var el = Ello.render('h2', {
    className: 'title',
    onClick: function onClick() {
      this.style.color = "green";
    }
  },
  'Hello world! Click to change color.');


var root = Ello.S('#container');
var reload = Ello.S('#reload');
Ello.updateElement(root, el);

reload.addEventListener('click', function() {
  updateElement(S('#container'), el);
});

        
