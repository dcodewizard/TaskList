Rails.application.routes.draw do
  resources :tasks do 
    collection do
      get :get_filtered_tasks
    end
  end
  resources :subtasks, only: %i[update destroy create]

  root "tasks#index"
end
