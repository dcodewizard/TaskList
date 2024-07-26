class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :heading, null: false
      t.text :description
      t.integer :status, null: false, default: 0
      t.datetime :deadline

      t.timestamps
    end

    add_check_constraint :tasks, "status IN (0, 1, 2)", name: 'tasks_status_check'
  end
end
