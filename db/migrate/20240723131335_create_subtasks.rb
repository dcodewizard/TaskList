class CreateSubtasks < ActiveRecord::Migration[7.0]
  def change
    create_table :subtasks do |t|
      t.references :task, null: false, foreign_key: { on_delete: :cascade }
      t.text :description, null: false
      t.boolean :completed, null: false, default: false

      t.timestamps
    end
  end
end