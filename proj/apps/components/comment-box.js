var CommentBox = React.createClass({
  handleCommentSubmit: function(comment){
    console.log(comment)
    this.updateCommentOptimistic(comment)
  },

  updateCommentOptimistic: function(comment){
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  },

  updateNewComment: function(comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(response) {
        var data = JSON.parse(response)
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  loadCommentsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(response) {
        var data = JSON.parse(response)
        console.log("data:", response)
        this.setState({data: data})

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },

  getInitialState(){
    return {
      data: []
    }
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function(){
    return(
      <div className='commentBox'>
        <h2> comments </h2>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
})

var CommentList = React.createClass({
  render: function(){
    var comments = this.props.data.map(function(comment){
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      )
    })
    return(
      <div className='commentList'>
        <h4> Default **{comments.length}** commentors</h4>
        {comments}
      </div>
    )
  }
})

var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function(){
    return (
      <div className='comment'>
        <h4 className='commentAuthor'>{this.props.author}</h4>
        <p>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </p>
      </div>

    )
  }
})

var CommentForm = React.createClass({
  handleSubmit: function(event){

    event.preventDefault()
    var author = React.findDOMNode(this.refs.author).value.trim()
    var text = React.findDOMNode(this.refs.text).value.trim()

    if(!author || !text)
      return false
    var comment = { author: author, text: text}
    this.props.onCommentSubmit(comment)

    React.findDOMNode(this.refs.author).value = ''
    React.findDOMNode(this.refs.text).value = ''

    return false
  },
  
  render: function(){
    return (
      <div>
        <form class='commentForm' onSubmit={this.handleSubmit} >
          <input type="text" placeholder="Your name" ref='author' />
          <input type="text" placeholder="Say something..." ref='text' />
          <input type="submit" value="Post" />
        </form>
      </div>
    )
  }
})
