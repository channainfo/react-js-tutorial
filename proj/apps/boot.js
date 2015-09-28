React.render(
  <FlashBar type='alert alert-info' title='Here we go with the title' />,
  document.getElementById('react-root')
)

React.render(
  <FlashBar type='alert alert-info' title='Here we go much further' />,
  document.getElementById('react-flash-bar')
)

React.render(
  <FilterList />,
  document.getElementById('react-list')
)


React.render(
  <CommentBox url='data/comments.json' pollInterval={50000} />,
  document.getElementById('comment-container')
)