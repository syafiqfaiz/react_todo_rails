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

  handleListSubmit: function(list){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: list,
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
        <TodoForm onListSubmit={this.handleListSubmit}/>
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
      <div className="todoList">
        {todoNodes}
      </div>
    );
  }
});

var TodoForm = React.createClass({
  getInitialState: function() {
    return {
      list: '',
      done: false  
    };
  },
  handleListChange: function(e){
    this.setState({list: e.target.value})
  },
  handleSubmit: function(e){
    e.preventDefault();
    var list = this.state.list.trim();
    var done = false;
    if (!list){
      return;
    }
    this.props.onListSubmit({list: list, done: done});
    this.setState({list: '', done: false})
  },
  render: function(){
    return(
      <form className="todoForm" onSubmit={this.handleSubmit}>
        <input 
          type="text"
          placeholder="What do you want to do?"
          value={this.state.list}
          onChange={this.handleListChange}
        />
        <input type="submit" value="Add" />
      </form>
    )
  }
})