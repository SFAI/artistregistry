Rails.application.routes.draw do
  
  devise_for :artists
  devise_for :buyers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'
<<<<<<< HEAD
<<<<<<< HEAD

=======
  get 'artists/:id' => 'artists#show'
>>>>>>> f2d92ef5db2f4e4b24b5704f1d0b23a81ba05e89


  namespace :api, defaults: { format: :json } do
    resources :works, :only => [:show, :create, :update, :destroy]
    resources :artists, :only => [:show, :create, :update, :destroy]
    get 'artists/works/:id' => 'artists#works'

  end
=======
  post 'commissions/create'
>>>>>>> alison/commissionsform
end
