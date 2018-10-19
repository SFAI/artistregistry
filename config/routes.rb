Rails.application.routes.draw do
  get 'artists/:id' => 'artists#show'
  devise_for :artists
  devise_for :buyers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'



  namespace :api, defaults: { format: :json } do
    resources :works, :only => [:show, :create, :update, :destroy]
    resources :artists, :only => [:show, :create, :update, :destroy]
    get 'artists/works/:id' => 'artists#works'

  end
end
