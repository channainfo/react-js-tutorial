var FlashBar = React.createClass({
  getInitialState: function(){
    return {
      shown: true,
      count: 1,
      closeStyle: 'display: block;'
    }
  },
  render: function(){
    return(
      <div className={this.props.type} onClick={this.inc} htmlStyle='{this.state.closeStyle}' >
        {this.props.title} - {this.state.shown} - {this.state.count}
        <a onClick={this.close} > [x] </a>
      </div>
    )
  },

  toggle: function(){
    var shown = this.state.shown
    this.setState({shown: !shown})
  },
  inc: function(){
    this.setState({count: this.state.count + 1 })
    this.setState({shown: !this.state.shown })
    console.log("shown", !this.state.shown)
  },
  close: function(){
    this.setState({closeStyle: 'display:none;' })
    console.log('close')
  }
})
