Rails.application.routes.draw do
  
  devise_for :artists
  devise_for :buyers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'
  get 'artists/:id' => 'artists#show'

  resources :artists, only: [:show] do
    member do
      post :generate_new_password_email
    end
  end

  resources :buyers, only: [:show] do
    member do
      post :generate_new_password_email
    end
  end

  namespace :api, defaults: { format: :json } do
    resources :works, :only => [:show, :create, :update, :destroy]
    resources :artists, :only => [:show, :create, :update, :destroy]
    get 'artists/works/:id' => 'artists#works'

  end
end
