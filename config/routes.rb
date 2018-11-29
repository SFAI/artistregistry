Rails.application.routes.draw do

  devise_for :artists
  devise_for :buyers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'works#index'

  resources :artists, only: [:show, :index, :update] do
    member do
      post :generate_new_password_email
    end
  end

  resources :buyers, only: [:show, :index] do
    member do
      post :generate_new_password_email
    end
  end

  resources :works, only: [:index, :new, :show, :edit] do
    collection do
      get 'categories', action: :get_work_category_enums
    end
  end

  resources :requests, only: [:index] do
    collection do
      get 'types', action: :get_type_enum
    end
  end

  # what are these?
  resources :commissions, only: [:index] do
    collection do
      get 'types', action: :get_type_enum
    end
  end

  # why isn't this in the api namespace?
  get '/receipts/types' => 'receipts#get_receipt_type_enums'

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
