Rails.application.routes.draw do

  devise_for :artists
  devise_for :buyers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'works#index'

  resources :artists, only: [:show, :index] do
    collection do
      get 'create_work'
    end
    member do
      get 'requests'
      post :generate_new_password_email
      resources :works, only: [:index, :new] do
      end
    end

  end

  resources :buyers, only: [:show, :index] do
    member do
      post :generate_new_password_email
    end
  end

  resources :works, only: [:index, :new] do
    collection do
      get 'categories', to: 'get_work_category_enums'
    end
  end
  # get 'artists/:id' => 'artists#show', as: :artistid
  # get '/artists/', to: 'artists#all_artists'
  # get 'buyers/:id' => 'buyers#show', as: :buyerid

  get '/requests' => 'requests#home'

  namespace :api, defaults: { format: :json } do
    resources :works, :only => [:index, :show, :create, :update, :destroy]
    resources :artists, :only => [:index, :show, :create, :update, :destroy]
    resources :requests, :only => [:show, :create, :update]
    resources :commissions, :only => [:show, :create, :update, :destroy]
    get 'artists/works/:id' => 'artists#works'
    get 'artists/requests/:id' => 'artists#requests'
    get 'buyers/requests/:id' => 'buyers#requests'
    get 'works/filtered_works/:search_params' => 'works#filtered_works'
    get 'works/thumbnail/:id' => 'works#thumbnail'
  end
end
