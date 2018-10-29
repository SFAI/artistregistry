Rails.application.routes.draw do

  devise_for :artists
  devise_for :buyers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'

  resources :artists, only: [:show] do
    collection do
      get 'profile'
    end    
  end

  get 'artists/:id' => 'artists#show', as: :artistid
  get '/artists/', to: 'artists#all_artists'
  get 'buyers/:id' => 'buyers#show', as: :buyerid

  namespace :api, defaults: { format: :json } do
    resources :works, :only => [:show, :create, :update, :destroy]
    resources :artists, :only => [:index, :show, :create, :update, :destroy]
    resources :requests, :only => [:show, :create, :update]
    resources :commissions, :only => [:show, :create, :update, :destroy]
    get 'artists/works/:id' => 'artists#works'
    get 'artists/requests/:id' => 'artists#requests'
  end
end
