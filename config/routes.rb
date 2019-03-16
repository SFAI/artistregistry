Rails.application.routes.draw do

  devise_for :artists, controllers: { registrations: 'artists/registrations' }
  devise_for :buyers, controllers: { registrations: 'buyers/registrations' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'works#index'

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
  get '/buyers/:id/update' => 'buyers#update', as: "update_buyer"

  get '/commissions/types' => 'commissions#get_type_enum'
  get '/commissions' => 'artists#commissions', as: :commissions

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
    get 'artists/categories' => 'artists#get_artist_category_enums'
    resources :works, :only => [:index, :show, :create, :update, :destroy]
    resources :artists, :only => [:index, :show, :create, :update, :destroy]
    resources :requests, :only => [:show, :create, :update]
    resources :commissions, :only => [:show, :create, :update, :destroy]
    resources :receipts, :only => [:show, :create, :update, :destroy]
    resources :buyers, :only => [:show, :update]
    get 'artists/works/:id' => 'artists#works'
    get 'artists/requests/:id' => 'artists#requests'
    get 'buyers/requests/:id' => 'buyers#requests'
    get 'works/filtered_works/:search_params' => 'works#filtered_works'
    get 'artists/filtered_artists/:search_params' => 'artists#filtered_artists'
    get 'receipts/artist/:id' => 'artists#receipts'
    get 'works/thumbnail/:id' => 'works#thumbnail'
    get 'artists/commissions/:id' => 'artists#commissions'
    get 'requests/request_exist/:search_params' => 'requests#request_exist'
  end
end
