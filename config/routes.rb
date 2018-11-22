Rails.application.routes.draw do

  devise_for :artists
  devise_for :buyers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'works#index'

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

  get '/artists/:id' => 'artists#show', as: :artistid
  get '/artists/', to: 'artists#all_artists'

  get '/transactions/artist/:id' => 'artists#transactions', as: :transactions
  get '/transactions/new' => 'transactions#new'
  get '/transactions/types' => 'transactions#get_transaction_type_enums'

  get '/works' => 'works#index'
  get '/works/categories' => 'works#get_work_category_enums'
  get '/works/new' => 'works#new'
  get '/works/:id' => 'works#show', as: "show_work"
  get 'works/:id/edit' => 'works#edit', as: "edit_work"

  get '/requests' => 'requests#home'

  get '/buyers/:id' => 'buyers#show', as: :buyerid


  namespace :api, defaults: { format: :json } do
    resources :works, :only => [:index, :show, :create, :update, :destroy]
    resources :artists, :only => [:index, :show, :create, :update, :destroy]
    resources :requests, :only => [:show, :create, :update]
    resources :commissions, :only => [:show, :create, :update, :destroy]
    resources :transactions, :only => [:show, :create, :update, :destroy]
    get 'artists/works/:id' => 'artists#works'
    get 'artists/requests/:id' => 'artists#requests'
    get 'buyers/requests/:id' => 'buyers#requests'
    get 'works/filtered_works/:search_params' => 'works#filtered_works'
    get 'transactions/artist/:id' => 'artists#transactions'
    get 'works/thumbnail/:id' => 'works#thumbnail'
  end
end
