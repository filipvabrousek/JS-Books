

/*                                     APP CLASS                         */
var App = React.createClass({
  // GET ITEMS()
  getItems: function() {
    return [{id: 1, name: "iPhone 7", price: 649},
            {id: 2, name: "iPhone 7 Plus", price: 769},
            {id: 3, name: "Macbook Pro 13", price: 1799}];
  },
  getInitialState: function() {
    return {
      items: this.getItems(),
      cart: []
    }
  },
  
  
  /*ADD TO CART()
  If item was added more than once, increment the quantity
 */
  addToCart: function(item) {
    var found = false;
    var updatedCart = this.state.cart.map((cartItem) => {
      if (cartItem.name == item.name) {
        found = true;
        cartItem.quantity++;
        return cartItem;
      } else {
        return cartItem;
      }
    });
    
    //if item IS NOT found, push product to cart w:/ quantoty: 1
    if (!found) { updatedCart.push({id: item.id, name: item.name, price: item.price, quantity: 1}) }
    //update the cart component
    this.setState({
      cart: updatedCart
    });
  },
  
  
/*RENDER()
Render the cart + items
 */
  
  render: function(){
    return (
      <div>
        <nav>
          <h3>Products</h3>
          <Cart cart={this.state.cart} />
        </nav>
          <div className="Products">  
            {this.state.items.map((item) => {
              return <Product details={item} addToCart={this.addToCart} />
            })}
          </div>
      </div>
    );
  }
});


/*
CART CLASS


*/
var Cart = React.createClass({
  getInitialState: function() {
    return {
      open: false
    }
  },
  openCart: function() {
    this.setState({
      open: !this.state.open
    })
  },
  //if the cart is opened, add the shadow to the cart box and fill it in with the data
  render: function() {
    return (
      <div className={"Cart " + (this.state.open ? "Cart-Open" : "")} onClick={this.openCart} >
        <p className="Title">Cart</p>
        <div>
        {this.props.cart.length > 0 ? this.props.cart.map((item) => {
          return <p>{item.name}{item.quantity > 1 ? <span> {item.quantity}</span> : ''}</p> }) : <p>Empty</p>}
        </div>
      </div>
    );
  }
});


/*
PRODUCT 
Add the addToCart function to product when clicked
*/
var Product = React.createClass({
  addToCart: function() {
    this.props.addToCart(this.props.details);
  },
  render: function() {
    let item = this.props.details;
    return (
      <div className="Product" onClick={this.addToCart}>
        <p>{item.name}</p>
        <p>{item.price}</p>
      </div>
    );
  }
});




//Render the result
ReactDOM.render(<App />, document.getElementById('app'));


//http://codepen.io/hermantnet/pen/EgWEom?editors=1010
