class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :list
      t.boolean :done

      t.timestamps null: false
    end
  end
end
