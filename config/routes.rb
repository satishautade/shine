Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'customers#index'
  resources :customers, only: [ :index ]
  resources :dashboard, only: [ :index ]

  get "angular_test", to: "angular_test#index"
end
