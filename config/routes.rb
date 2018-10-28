Rails.application.routes.draw do

  devise_for :artists
  devise_for :buyers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'
  get 'artists/:id' => 'artists#show', as: :artistid
  get 'artists/', to: 'artists#all_artists'
  get 'works/' => 'works#index'
  get 'works/categories' => 'works#get_work_category_enums'
  get 'buyers/:id' => 'buyers#show', as: :buyerid

  namespace :api, defaults: { format: :json } do
    resources :works, :only => [:create, :update, :destroy]
    resources :artists, :only => [:index, :show, :create, :update, :destroy]
    resources :requests, :only => [:show, :create, :update]
    resources :commissions, :only => [:show, :create, :update, :destroy]
    get 'artists/works/:id' => 'artists#works'
    get 'works/filtered_works/:search_params' => 'works#filtered_works'
    get 'works/index' => 'works#index'
    get 'works/:id/show' => 'works#show'
  end
end
