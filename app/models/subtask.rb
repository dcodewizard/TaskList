class Subtask < ApplicationRecord
  belongs_to :task

  validates :description, presence: true, length: { maximum: 255 }
end