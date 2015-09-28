var ListItem = React.createClass({
  render: function(){
    return (
      <li>{this.props.item.name}</li>
    )
  }
})

var List = React.createClass({
  render: function(){
    return(
      <div classFor='list'>
        <ul>
          {
            this.props.items.map(function(item){
              return <ListItem item={item} />
            })
          }
        </ul>
      </div>
    )
  }
})

var FilterList = React.createClass({
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
      <div className='filter-list'>
        <input type='text' placeholder='Search ...' onChange={this.updateResult} ref='search-box' />
        <div onClick={this.reloadData} >
          Reload
        </div>
        <List items={this.state.items} />
      </div>
    )
  }

})