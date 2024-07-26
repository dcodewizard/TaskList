FactoryBot.define do
  factory :task do
    heading { "Sample Task" }
    description { "Task description" }
    deadline { Date.tomorrow }
    status { "pending" }
  end
end