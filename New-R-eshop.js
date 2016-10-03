/*
<header>
  <h1>This is my eshop</h1>
</header>
<div id="main">
<!----this will be replaced by product components and search bar-->
</div>
<footer>
  <p>copyright 2016</p>
</footer>

*{
margin: 0;
padding: 0;
font-family: Arial;

}

header, footer{
background: #3498db;
color: #fff;
padding: 20px;
}

#main{
margin: 60px;
}

#main > *{
margin: 12px;
}

input[type=text]{
    text-align: center;
    font: inherit;
    border: 6px solid #3498db;
    padding: 13px 12px;
    font-size: 15px;
   
    width: 70%;
    outline: none;
    display: block;
    color: #7B8585;
    margin: 0 auto 20px;
}

ul{
margin: 0 auto 20px;
list-style-type: none;
  
}

li{
margin: 10px;
padding: 10px;
background: #95a5a6;
width: 40%;

}

img{
width: 80%;
}


*/


var Items = React.createClass({
  getInitialState: function() {
    return {
      searchS: ""
    };
  },

  handleChange: function(e) {
    this.setState({
      searchS: e.target.value
    });
  },
  render: function() {
    var products = this.props.items,
      searchS = this.state.searchS.trim().toLowerCase();
    if (searchS > 0) {
      products = products.filter(function(l) {
        return l.name.toLowerCase().match(searchS)
      });
    }

     return <div > 
       
       <input type = "text"
        value = {
            this.state.searchS
        }
        onChange = {
            this.handleChange
        }
        placeholder = "Type the name of the product" /> 
       <ul> 
         
         {products.map(function(l) { return <li><h2> {  l.title }</h2> <p> { l.desc }</p> <p> {l.price} USD </p> <img src = {l.url}/> </li > }) } 
       
       </ul> </div >;
  }
});

var products = [{
  title: "Learn Photoshop CC 2016",
  desc: "The easiest way to master photoshop",
  price: "122",
  url: "https://worldvectorlogo.com/logos/photoshop-cc.svg"
}, {
  title: "Learn Illustrator CC 2015",
  desc: "Create beuatiful vector graphics in best graphic software available today.",
  price: "63",
  url: "https://worldvectorlogo.com/logos/adobe-illustrator-cc.svg"
},
 {
  title: "Learn InDesign CC 2015",
  desc: "Design beuatiful articles in seconds",
  price: "32",
   url: "https://worldvectorlogo.com/logos/indesign-cc.svg"
}];

ReactDOM.render( < Items items = {products}/>,
  document.querySelector("#main")
);
