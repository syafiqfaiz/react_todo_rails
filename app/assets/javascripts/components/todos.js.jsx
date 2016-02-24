var TodoLists = React.createClass({
  render: function() {
    return (
      <div>
        <Todos data={this.props.data} />
      </div>
    );
  }
});


var Todo = React.createClass({
  render: function() {
    return (
      <div  className="list">{this.props.list} {this.props.children ? "done" : "not done"}</div>
    );
  }
});

var Todos = React.createClass({
  render: function() {
    var todosNodes = this.props.data.map(function(todo) {
      return (
        <Todo list = {todo.list} key = {todo.id}>
          {todo.done}
        </Todo>
      );
    });
    return (
      <div className="commentList">
        {todosNodes}
      </div>
    );
  }
});