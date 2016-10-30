function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
  return a - b;
}

var App = React.createClass({
	getInitialState: function () {
		return {
			data: [],
			series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
			labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
			colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
		}
	},
	componentDidMount: function () {
		this.populateArray();
		setInterval(this.populateArray, 2000);
	},
	populateArray: function () {
		var data = [],
			series = 5,//getRandomInt(2, 10),
			serieLength = 5;//getRandomInt(2, 10);
	
		for (var i = series; i--; ) {
			var tmp = [];
			
			for (var j = serieLength; j--; ) {
				tmp.push(getRandomInt(0, 20));
			}
			
			data.push(tmp);			
		}
		
		this.setState({ data: data });
	},
	render: function () {
		return (
			<section>
				<Charts
					data={ this.state.data }
					labels={ this.state.series }
					colors={ this.state.colors }
					height={ 250 }
				/>
			
				<Charts
					data={ this.state.data }
					labels={ this.state.series }
					colors={ this.state.colors }
					height={ 250 }
					opaque={ true }
					grouping={ 'stacked' }
				/>
				
				<Charts
					data={ this.state.data }
					labels={ this.state.series }
					colors={ this.state.colors }
					height={ 250 }
					grouping={ 'layered' }
				/>
			
				<Charts
					data={ this.state.data }
					labels={ this.state.series }
					colors={ this.state.colors }
					horizontal={ true }
				/>
				
				<Legend labels={ this.state.labels } colors={ this.state.colors } />
			</section>
		);
	}
});



var Legend = React.createClass({
	render: function () {
		var labels = this.props.labels,
			colors = this.props.colors;
		
		return (
		<div className="Legend">
			{ labels.map(function(label, labelIndex) {
				return (
				<div>
					<span className="Legend--color" style={{ backgroundColor: colors[labelIndex % colors.length]  }} />
					<span className="Legend--label">{ label }</span>
				</div>
				);
			}) }
		</div>
		);
	}
});

var Charts = React.createClass({
	render: function () {
		var self = this,
			data = this.props.data,
			layered = this.props.grouping === 'layered' ? true : false,
			stacked = this.props.grouping === 'stacked' ? true : false,
			opaque = this.props.opaque,
			max = 0;
		
		for (var i = data.length; i--; ) {
			for (var j = data[i].length; j--; ) {
				if (data[i][j] > max) {
					max = data[i][j];
				}
			}
		}
		
				
		return (
			<div className={ 'Charts' + (this.props.horizontal ? ' horizontal' : '' ) }>
				{ data.map(function (serie, serieIndex) {
				 	var sortedSerie = serie.slice(0),
				 		sum;
				 	
				 	sum = serie.reduce(function (carry, current) {
				 		return carry + current;
					}, 0);
				 	sortedSerie.sort(compareNumbers);				 		
									 
					return (
						<div className={ 'Charts--serie ' + (self.props.grouping) }
				 			key={ serieIndex }
							style={{ height: self.props.height ? self.props.height: 'auto' }}
						>
						<label>{ self.props.labels[serieIndex] }</label>
						{ serie.map(function (item, itemIndex) {
							var color = self.props.colors[itemIndex], style,
								size = item / (stacked ? sum : max) * 100;
							
							style = {
								backgroundColor: color,
								opacity: opaque ? 1 : (item/max + .05),
								zIndex: item
							};
						
							if (self.props.horizontal) {
								style['width'] = size + '%';
							} else {								
								style['height'] = size + '%';						
							}
	
							if (layered && !self.props.horizontal) {
								//console.log(sortedSerie, serie, sortedSerie.indexOf(item));
								style['right'] = ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%';
								// style['left'] = (itemIndex * 10) + '%';
							}
						
						 return (
							 <div
							 	className={ 'Charts--item ' + (self.props.grouping) }
							 	style={ style }
								key={ itemIndex }
							>
							 	<b style={{ color: color }}>{ item }</b>
							 </div>
						);
						}) }
						</div>
					);
				}) }
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));




/*
<div id="wrapper">
  <div id="app"></div>
</div>
*/

/*
.Charts {
  margin: 0 auto;
  background-color: #f9f9f9;
  display: flex;
  align-items: flex-end;
  padding: 50px;
}

.Charts.horizontal {
  display: block;
}

.Charts.horizontal .Charts--serie {
  display: block;
  margin: 0 0 30px 0;
  border: 0;
}

.Charts.horizontal .Charts--serie label {
  position: relative;
  top: auto;
  right: auto;
  left: 0;
  bottom: auto;
  padding: 0 0 10px 0;
}

.Charts--serie {
  height: 100%;
  margin: 0 30px 0 0;
  display: inline-block;
  flex: 1;
  display: flex;
  align-items: flex-end;
  transform-origin: 0 100%;
  animation: slideUp .6s;
  position: relative;
  border-bottom: 1px solid #c2c2c2;
}

.Charts--serie.stacked {
  display: block;
}

.Charts--serie label {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20px;
  font-family: Helvetica, sans-serif;
  font-size: 10px;
  text-align: center;
  color: #808080;
}

.Charts.horizontal .Charts--item {
  display: block;
  border-radius: 0 2px 2px 0;
  margin: 0 0 5px 0;
  height: 1em;
}

.Charts.horizontal .Charts--item b {
  position: absolute;
  right: -20px;
  top: .3em;
}

.Charts--item {
  background-color: #43A19E;
  display: inline-block;
  margin: 0 5px 0 0;
  flex: 1;
  transition: height 1s ease-out, width 1s ease-out;
  position: relative;
  text-align: center;
  border-radius: 2px 2px 0 0;
}

.Charts--item.layered {
  position: absolute;
  left: 5%;
  right: 5%;
  bottom: 0;
  margin: 0;
}

.Charts--item.layered b {
  position: absolute;
  right: 0;
}

.Charts--item.stacked {
  position: relative;
  display: block;
  border-radius: 0;
}

.Charts--item b {
  position: relative;
  font-family: Helvetica, sans-serif;
  font-size: 10px;
  top: -20px;
  color: #43A19E;
}

.Legend--color {
  display: inline-block;
  vertical-align: middle;
  border-radius: 2px;
  width: 16px;
  height: 16px;
}

.Legend--label {
  display: inline-block;
  vertical-align: middle;
  font-family: Helvetica, sans-serif;
  font-size: 12px;
  margin: 0 0 0 5px;
}

*/
