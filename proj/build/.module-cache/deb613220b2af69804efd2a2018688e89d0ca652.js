var ListItem = React.createClass({displayName: "ListItem",
  render: function(){
    return (
      React.createElement("li", null, this.props.item.name)
    )
  }
})

var List = React.createClass({displayName: "List",
  render: function(){
    return(
      React.createElement("div", {classFor: "list"}, 
        React.createElement("ul", null, 
          
            this.props.items.map(function(item){
              return React.createElement(ListItem, {item: item})
            })
          
        )
      )
    )
  }
})

var FilterList = React.createClass({displayName: "FilterList",
  getInitialState: function(){
    return { items: this.fetchItems() }
  },

  fetchItems: function(){
    itemsLoaded = [ 
              {name: 'Php', score: '5'},
              {name: 'Ruby', score: '4.5'},
              {name: 'Python', score: '4.5'},
              {name: 'Node', score: '5'},
              {name: 'Java', score: '3.5'},
              {name: 'C#', score: '2.5'}]
    return itemsLoaded;
  },

  reloadData: function(){
    this.setState({items: this.fetchItems()})
  },

  updateResult: function(event){
    var dataSet = this.fetchItems()
    var ref = this.refs['search-box']

    var searchResult = dataSet.filter(function(item){
  
      // var value = event.target.value.toLowerCase()

      var searchBox = React.findDOMNode(ref)
      var value = searchBox.value

      console.log(item)
      console.log(event.target)
      console.log(value)

      return item.name.toLowerCase().search(value) != -1
    })

    console.log('result:', searchResult)
    this.setState({items: searchResult})
  },

  render: function(){
    return (
      React.createElement("div", {className: "filter-list"}, 
        React.createElement("input", {type: "text", placeholder: "Search ...", onChange: this.updateResult, ref: "search-box"}), 
        React.createElement("div", {onClick: this.reloadData}, 
          "Reload"
        ), 
        React.createElement(List, {items: this.state.items})
      )
    )
  }

})