Rails.application.routes.draw do
  resources :tasks
  resources :subtasks, only: %i[update destroy create]

  root "tasks#index"
end
