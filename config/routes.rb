Rails.application.routes.draw do
  
  devise_for :artists
  devise_for :buyers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'
  get 'artists/:id' => 'artists#show'
  get '/works/:id', to: 'works#show'


  namespace :api, defaults: { format: :json } do
    resources :works, :only => [:show, :create, :update, :destroy]
    resources :artists, :only => [:show, :create, :update, :destroy]
    resources :requests, :only => [:show, :create, :update]
    get 'artists/works/:id' => 'artists#works'
    get 'artists/requests/:id' => 'artists#requests'

  end
end
