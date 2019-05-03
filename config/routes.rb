Rails.application.routes.draw do

  devise_for :admins, controllers: { registrations: 'admins/registrations' }, path_names: { sign_up: '' }
  devise_for :artists, controllers: { registrations: 'artists/registrations' }
  devise_for :buyers, controllers: { registrations: 'buyers/registrations' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'works#index'

  get '/artists/confirm_email', to: 'artists#confirm_email', as: 'artists_confirm_email'
  get '/artists/:id' => 'artists#show', as: :artistid
  get '/artists/', to: 'artists#all_artists'
  get '/artists/:id/update' => 'artists#update', as: "update_artist"
  # Add route to email confirmation page

  get '/receipts/types' => 'receipts#get_receipt_type_enums'

  get '/works' => 'works#index'
  get '/works/categories' => 'works#get_work_category_enums'
  get '/works/new' => 'works#new'
  get '/works/:id' => 'works#show', as: "show_work"
  get '/works/:id/edit' => 'works#edit', as: "edit_work"

  get '/requests' => 'requests#home'
  get '/requests/types' => 'requests#get_type_enum'

  get '/buyers/confirm_email', to: 'buyers#confirm_email', as: 'buyers_confirm_email'
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
    resources :works, :only => [:show, :create, :update, :destroy]
    resources :artists, :only => [:index, :show, :create, :update, :destroy]
    resources :requests, :only => [:show, :create, :update]
    resources :commissions, :only => [:show, :create, :update, :destroy]
    resources :receipts, :only => [:show, :create, :update, :destroy]
    resources :buyers, :only => [:show, :update]
    get 'works/page/:page' => 'works#index'
    get 'artists/works/:id' => 'artists#works'
    get 'artists/requests/:id' => 'artists#requests'
    get 'buyers/requests/:id' => 'buyers#requests'
    get 'works/filtered_works/:search_params/:page' => 'works#filtered_works'
    get 'artists/filtered_artists/:search_params' => 'artists#filtered_artists'
    get 'works/thumbnail/:id' => 'works#thumbnail'
    get 'artists/commissions/:id' => 'artists#commissions'
    post 'blocks/block_user' => 'blocks#block_user', as: :block_user
    post 'blocks/unblock_user' => 'blocks#unblock_user', as: :unblock_user
    get 'blocks/is_blocking/:search_params' => 'blocks#is_blocking', as: :is_blocking
    get 'requests/request_exist/:search_params' => 'requests#request_exist'
    put 'requests/delete/:id' => 'requests#delete'
    put 'artists/lock_user/:id' => 'artists#lock_user'
    put 'artists/unlock_user/:id' => 'artists#unlock_user'
    put 'buyers/lock_user/:id' => 'buyers#lock_user'
    put 'buyers/unlock_user/:id' => 'buyers#unlock_user'
    put 'works/flag/:id' => 'works#flag'
  end
end
