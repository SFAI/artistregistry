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
  get '/artists/:id/update' => 'artists#update', as: "update_artist"

  get '/receipts/types' => 'receipts#get_receipt_type_enums'

  get '/works' => 'works#index'
  get '/works/categories' => 'works#get_work_category_enums'
  get '/works/new' => 'works#new'
  get '/works/:id' => 'works#show', as: "show_work"
  get '/works/:id/edit' => 'works#edit', as: "edit_work"

  get '/requests' => 'requests#home'
  get '/requests/types' => 'requests#get_type_enum'

  get '/buyers/:id' => 'buyers#show', as: :buyerid

  get '/commissions/types' => 'commissions#get_type_enum'
  get '/commissions' => 'artists#commissions', as: :commissions


  namespace :api, defaults: { format: :json } do
    resources :works, :only => [:index, :show, :create, :update, :destroy]
    resources :artists, :only => [:index, :show, :create, :update, :destroy]
    resources :requests, :only => [:show, :create, :update]
    resources :commissions, :only => [:show, :create, :update, :destroy]
    resources :receipts, :only => [:show, :create, :update, :destroy]
    get 'artists/works/:id' => 'artists#works'
    get 'artists/requests/:id' => 'artists#requests'
    get 'buyers/requests/:id' => 'buyers#requests'
    get 'works/filtered_works/:search_params' => 'works#filtered_works'
    get 'receipts/artist/:id' => 'artists#receipts'
    get 'works/thumbnail/:id' => 'works#thumbnail'
    get 'artists/commissions/:id' => 'artists#commissions'
  end
end
