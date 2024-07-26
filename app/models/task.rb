class Task < ApplicationRecord
  has_many :subtasks, dependent: :destroy
  accepts_nested_attributes_for :subtasks, allow_destroy: true

  validates :heading, presence: true
  validates :description, length: { maximum: 255 }
  validates :status, inclusion: { in: [0, 1, 2], message: "%{value} is not a valid status" }

  scope :completed , -> {where(status: 2)}
  scope :pending , -> {where(status: 0)}
  scope :in_progress , -> {where(status: 1)}
end