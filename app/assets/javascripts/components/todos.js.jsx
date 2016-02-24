var TodoLists = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadFromServer();
    setInterval(this.loadFromServer, this.props.pollInterval);
  },

  loadFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>
        <Todos data={this.state.data} />
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
    var todoNodes = this.props.data.map(function(todo) {
      return (
        <Todo list = {todo.list} key = {todo.id}>
          {todo.done}
        </Todo>
      );
    });
    return (
      <div className="commentList">
        {todoNodes}
      </div>
    );
  }
});