
/*----------------------------------------PRODUCT CATEGORY ROW----------------------------------------*/
var ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
});


/*----------------------------------------PRODUCT ROW----------------------------------------*/
var ProductRow = React.createClass({
  //render
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    //return
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

/*----------------------------------------PRODUCT TABLE----------------------------------------*/
var ProductTable = React.createClass({
  //render
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    }.bind(this));
    //return
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

/*----------------------------------------SEARCH BAR----------------------------------------*/
var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  },
  //render
  render: function() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            ref="inStockOnlyInput"
            onChange={this.handleChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});

/*----------------------------------------FILTERABLE PRODUCT TABLE----------------------------------------*/
var FilterableProductTable = React.createClass({
  getInitialState: function() {
    //return
    return {
      filterText: '',
      inStockOnly: false
    };
  },

  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },

  //render
  render: function() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onUserInput={this.handleUserInput}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
});

//---------------------------------JSON database - Products will be generated---------------------------
var PRODUCTS = [{
  category: 'Sporting Goods',
  price: '$49.99',
  stocked: true,
  name: 'Football'
}, {
  category: 'Sporting Goods',
  price: '$29.99',
  stocked: false,
  name: 'Basketball'
}, {
  category: 'Electronics',
  price: '$99.99',
  stocked: true,
  name: 'iPod Touch'
}];

/*----------------------------------------RENDER RESULT----------------------------------------*/
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
