React.render(
  React.createElement(Alert, {type: "alert alert-info", title: "Here we go with the title"}),
  document.getElementById('react-root')
)

React.render(
  React.createElement(Alert, {type: "alert alert-info", title: "Here we go much further"}),
  document.getElementById('react-alert')
)

React.render(
  React.createElement(FilterList, null),
  document.getElementById('react-list')
)