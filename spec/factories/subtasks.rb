FactoryBot.define do
  factory :subtask do
    description { "Sample Subtask" }
    completed { false }
    association :task
  end
end