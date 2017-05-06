!(() => {
    function VNode() {}


    /*--------------------------------------H FUNCTION-------------------------------
    1) push arguments[i] to STACK
    2) push attributes.children to STACK array
    3) push children
    4) set properties of VNode function / object
    
    
    */
    function h(nodeName, attributes) {
        let lastSimple;
        let child;
        let simple;
        let i;
        let children = EMPTY_CHILDREN;
        //1
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);

        // 2
        if (attributes && null != attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }

        //3
        while (stack.length) if ((child = stack.pop()) && void 0 !== child.pop) for (i = child.length; i--; ) stack.push(child[i]); else {
            if (child === !0 || child === !1) child = null;
            if (simple = 'function' != typeof nodeName) if (null == child) child = ''; else if ('number' == typeof child) child = String(child); else if ('string' != typeof child) simple = !1;
            if (simple && lastSimple) children[children.length - 1] += child; else if (children === EMPTY_CHILDREN) children = [ child ]; else children.push(child);
            lastSimple = simple;
        }


        //4
        const p = new VNode();
        p.nodeName = nodeName;
        p.children = children;
        p.attributes = null == attributes ? void 0 : attributes;
        p.key = null == attributes ? void 0 : attributes.key;
        if (void 0 !== options.vnode) options.vnode(p);
        return p;
    }


    /*-----------------------------------OTHER FUNCTIONS--------------------------------------------
    5) Extend object with props
    6) clone element using "h" function and "clone element"
    7) put renderers in order
    8) rerender
    9) isSameNodeType - BOOLEAN
    10) isSameNode - BOOLEAN
    11) getNodeProps 
    12) createNode
    13) removeNode
    
    */

    //5
    function extend(obj, props) {
        for (const i in props) obj[i] = props[i];
        return obj;
    }

    //6
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }


    //7
    function enqueueRender(component) {
        if (!component.__d && (component.__d = !0) && 1 == items.push(component)) (options.debounceRendering || setTimeout)(rerender);
    }


    //8
    function rerender() {
        let p;
        const list = items;
        items = [];
        while (p = list.pop()) if (p.__d) renderComponent(p);
    }

    //9
    function isSameNodeType(node, vnode, hydrating) {
        if ('string' == typeof vnode || 'number' == typeof vnode) return void 0 !== node.splitText;
        if ('string' == typeof vnode.nodeName) return !node._componentConstructor && isNamedNode(node, vnode.nodeName); else return hydrating || node._componentConstructor === vnode.nodeName;
    }

    //10
    function isNamedNode(node, nodeName) {
        return node.__n === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
    }


    //11
    function getNodeProps(vnode) {
        const props = extend({}, vnode.attributes);
        props.children = vnode.children;
        const defaultProps = vnode.nodeName.defaultProps;
        if (void 0 !== defaultProps) for (const i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }


    //12
    function createNode(nodeName, isSvg) {
        const node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
        node.__n = nodeName;
        return node;
    }


    //13
    function removeNode(node) {
        if (node.parentNode) node.parentNode.removeChild(node);
    }




    /*-----------------------------------------------SET ACCESSOR------------------------------------------------
    14) Set CSS style and class
    15) Check if name contains ON on first 2 positions, if yes add eventlistener
    16) Work with attributes
    
    */
    function setAccessor(node, name, old, value, isSvg) {
       
        //14
        if ('className' === name) name = 'class';
        
        if ('key' === name) ; else if ('ref' === name) {
            if (old) old(null);
            if (value) value(node);
            
        } else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || 'string' == typeof value || 'string' == typeof old) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if ('string' != typeof old) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && IS_NON_DIMENSIONAL.test(i) === !1 ? `${value[i]}px` : value[i];
            }
            
            
            
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } 
        
        //15
        else if ('o' == name[0] && 'n' == name[1]) {
            const useCapture = name !== (name = name.replace(/Capture$/, ''));
            name = name.toLowerCase().substring(2);
            if (value) {
                if (!old) node.addEventListener(name, eventProxy, useCapture);
            } else node.removeEventListener(name, eventProxy, useCapture);
            (node.__l || (node.__l = {}))[name] = value;
        }
        
        //16
        else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || value === !1) node.removeAttribute(name);
        } else {
            const ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase()); else node.removeAttribute(name); else if ('function' != typeof value) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value); else node.setAttribute(name, value);
        }
    }






    /*----------------------------------------SMALL FUNCTIONS---------------------------------------
    17) Set property
    18) eventproxy
    19) flush mounts
    
    */

    //17
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }

    //18
    function eventProxy(e) {
        return this.__l[e.type](options.event && options.event(e) || e);
    }

    //19
    function flushMounts() {
        let c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }

    /*------------------------------------------DIFF----------------------------------
    20) diff ?
    21) idiff ?
    22) innerDiffNode
    23) recolectNodeTree
    24) removeNode
    
    
    
    */


    //20
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = null != parent && void 0 !== parent.ownerSVGElement;
            hydrating = null != dom && !('__preactattr_' in dom);
        }
        const ret = idiff(dom, vnode, context, mountAll, componentRoot);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }



    //21
    function idiff(dom, vnode, context, mountAll, componentRoot) {
        let out = dom;
        const prevSvgMode = isSvgMode;
        if (null == vnode) vnode = '';

        if ('string' == typeof vnode) {
            if (dom && void 0 !== dom.splitText && dom.parentNode && (!dom._component || componentRoot)) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                out = document.createTextNode(vnode);
                if (dom) {
                    if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                    recollectNodeTree(dom, !0);
                }
            }
            out.__preactattr_ = !0;
            return out;
        }


        if ('function' == typeof vnode.nodeName) return buildComponentFromVNode(dom, vnode, context, mountAll);
        isSvgMode = 'svg' === vnode.nodeName ? !0 : 'foreignObject' === vnode.nodeName ? !1 : isSvgMode;
        if (!dom || !isNamedNode(dom, String(vnode.nodeName))) {
            out = createNode(String(vnode.nodeName), isSvgMode);
            if (dom) {
                while (dom.firstChild) out.appendChild(dom.firstChild);
                if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, !0);
            }
        }


        const fc = out.firstChild;
        const props = out.__preactattr_ || (out.__preactattr_ = {});
        const vchildren = vnode.children;
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && null != fc && void 0 !== fc.splitText && null == fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || null != fc) innerDiffNode(out, vchildren, context, mountAll, hydrating || null != props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        isSvgMode = prevSvgMode;
        return out;
    }









    // 22
    function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
        let j;
        let c;
        let vchild;
        let child;
        const originalChildren = dom.childNodes;
        const children = [];
        const keyed = {};
        let keyedLen = 0;
        let min = 0;
        const len = originalChildren.length;
        let childrenLen = 0;
        const vlen = vchildren ? vchildren.length : 0;
        if (0 !== len) for (var i = 0; i < len; i++) {
            const _child = originalChildren[i];
            const props = _child.__preactattr_;
            var key = vlen && props ? _child._component ? _child._component.__k : props.key : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (props || (void 0 !== _child.splitText ? isHydrating ? _child.nodeValue.trim() : !0 : isHydrating)) children[childrenLen++] = _child;
        }
        if (0 !== vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && void 0 !== keyed[key]) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) if (void 0 !== children[j] && isSameNodeType(c = children[j], vchild, isHydrating)) {
                child = c;
                children[j] = void 0;
                if (j === childrenLen - 1) childrenLen--;
                if (j === min) min++;
                break;
            }
            child = idiff(child, vchild, context, mountAll);
            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) if (child === originalChildren[i + 1]) removeNode(originalChildren[i]); else dom.insertBefore(child, originalChildren[i] || null);
        }
        if (keyedLen) for (var i in keyed) if (void 0 !== keyed[i]) recollectNodeTree(keyed[i], !1);
        while (min <= childrenLen) if (void 0 !== (child = children[childrenLen--])) recollectNodeTree(child, !1);
    }



    // 23
    function recollectNodeTree(node, unmountOnly) {
        const component = node._component;
        if (component) unmountComponent(component); else {
            if (null != node.__preactattr_ && node.__preactattr_.ref) node.__preactattr_.ref(null);
            if (unmountOnly === !1 || null == node.__preactattr_) removeNode(node);
            removeChildren(node);
        }
    }

    //24
    function removeChildren(node) {
        node = node.lastChild;
        while (node) {
            const next = node.previousSibling;
            recollectNodeTree(node, !0);
            node = next;
        }
    }


    /*--------------------------------------------------------------------------------
    25) diff attributes using "setAccessor"
    26) collectComponent ?
    27) createComponent ?
    28) doRender
    
    */

    //25
    function diffAttributes(dom, attrs, old) {
        let name;
        for (name in old) if ((!attrs || null == attrs[name]) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }

    //26
    function collectComponent(component) {
        const name = component.constructor.name;
        (components[name] || (components[name] = [])).push(component);
    }


    //27
    function createComponent(Ctor, props, context) {
        let inst;
        const list = components[Ctor.name];
        if (Ctor.prototype && Ctor.prototype.render) {
            inst = new Ctor(props, context);
            Component.call(inst, props, context);
        } else {
            inst = new Component(props, context);
            inst.constructor = Ctor;
            inst.render = doRender;
        }
        if (list) for (let i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.__b = list[i].__b;
            list.splice(i, 1);
            break;
        }
        return inst;
    }


    //28
    function doRender(props, state, context) {
        return this.constructor(props, context);
    }


    /*---------------------------------------------------------------------------------
    29) setComponentProps
    30) renderComponent
    31) buildComponentFromVNode
    32) unmountComponent
    */

    //29
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component.__x) {
            component.__x = !0;
            if (component.__r = props.ref) delete props.ref;
            if (component.__k = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.__c) component.__c = component.context;
                component.context = context;
            }
            if (!component.__p) component.__p = component.props;
            component.props = props;
            component.__x = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__r) component.__r(component);
        }
    }






    //30

    function renderComponent(component, opts, mountAll, isChild) {
        if (!component.__x) {
            let rendered;
            let inst;
            let cbase;
            const props = component.props;
            const state = component.state;
            let context = component.context;
            const previousProps = component.__p || props;
            const previousState = component.__s || state;
            const previousContext = component.__c || context;
            const isUpdate = component.base;
            const nextBase = component.__b;
            const initialBase = isUpdate || nextBase;
            const initialChildComponent = component._component;
            let skip = !1;
            
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }

            component.__p = component.__s = component.__c = component.__b = null;
            component.__d = !1;
          
            if (!skip) {
                rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(extend({}, context), component.getChildContext());
                let toUnmount;
                let base;
                const childComponent = rendered && rendered.nodeName;
              
                if ('function' == typeof childComponent) {
                    const childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__k) setComponentProps(inst, childProps, 1, context, !1); else {
                        toUnmount = inst;
                        component._component = inst = createComponent(childComponent, childProps, context);
                        inst.__b = inst.__b || nextBase;
                        inst.__u = component;
                        setComponentProps(inst, childProps, 0, context, !1);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                }
                
                else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }



                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    const baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase, !1);
                        }
                    }
                }



                if (toUnmount) unmountComponent(toUnmount);
                component.base = base;
                if (base && !isChild) {
                    let componentRef = component;
                    let t = component;
                    while (t = t.__u) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }



            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                flushMounts();
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            if (null != component.__h) while (component.__h.length) component.__h.pop().call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }




//31
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        let c = dom && dom._component;
        const originalComponent = c;
        let oldDom = dom;
        const isDirectOwner = c && dom._componentConstructor === vnode.nodeName;
        let isOwner = isDirectOwner;
        const props = getNodeProps(vnode);
        while (c && !isOwner && (c = c.__u)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.__b) {
                c.__b = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom, !1);
            }
        }
        return dom;
    }



//32
    function unmountComponent(component) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        const base = component.base;
        component.__x = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        const inner = component._component;
        if (inner) unmountComponent(inner); else if (base) {
            if (base.__preactattr_ && base.__preactattr_.ref) base.__preactattr_.ref(null);
            component.__b = base;
            removeNode(base);
            collectComponent(component);
            removeChildren(base);
        }
        if (component.__r) component.__r(null);
    }




    /*----------------------------------COMPONENT--------------------------------
    33) Component
    34) Render
    
    */
    
    //33
    function Component(props, context) {
        this.__d = !0;
        this.context = context;
        this.props = props;
        this.state = this.state || {};
    }


//34
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent, !1);
    }


    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var items = [];
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};


    extend(Component.prototype, {
        setState(state, callback) {
            const s = this.state;
            if (!this.__s) this.__s = extend({}, s);
            extend(s, 'function' == typeof state ? state(s, this.props) : state);
            if (callback) (this.__h = this.__h || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate(callback) {
            if (callback) (this.__h = this.__h || []).push(callback);
            renderComponent(this, 2);
        },
        render() {}
    });




    /*----------------------------------PREACT OBJECT--------------------------------*/
    const preact = {
        h,
        createElement: h,
        cloneElement,
        Component,
        render,
        rerender,
        options
    };


    if ('undefined' != typeof module) module.exports = preact; else self.preact = preact;
})();










/*----------------------------------DOESN'T WORK W:/O IT :)--------------------------------*/
!((t, e) => {"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("preact")):"function"==typeof define&&define.amd?define(["preact"],e):t.linkState=e(t.preact)})(this,t => {function e(t,e,n,o){for(o=0,e=e.split?e.split("."):e;t&&o<e.length;)t=t[e[o++]];return void 0===t?n:t}function n(t,n,o){const r=n.split(".");return function(n){for(var i=n&&n.target||this,f={},p=f,u="string"==typeof o?e(n,o):i.nodeName?i.type.match(/^che|rad/)?i.checked:i.value:n,a=0;a<r.length-1;a++)p=p[r[a]]||(p[r[a]]=!a&&t.state[r[a]]||{});p[r[a]]=u,t.setState(f)}}return t.Component.prototype.linkState=function(t,e){return n(this,t,e)},n});

/*
let { h, render, Component } = preact; // import { ... } from 'preact';


class App extends Component {
  state = {
    text: "Hello!"
  };

  render({}, { text }) {
    return (
      <app>
        <input
          type="text"
          placeholder="Enter text..."
          value={text}
          onInput={this.linkState("text")}
        />
        <main>
          <Result text={text} />
        </main>
      </app>
    );
  }
}

class Result extends Component {
  render({ text }) {
    return <h1>{text}</h1>;
  }
}

render(<App />, document.body);








*/
