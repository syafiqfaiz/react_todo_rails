class TodosController < ApplicationController
  def index
    @todos = Todo.all
    render json: @todos
  end

  def create
    Todo.create(list: params['list'], done: params['done'])
    @todos = Todo.all
    render json: @todos
  end
end
