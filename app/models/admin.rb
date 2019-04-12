class Admin < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  validates :email, :presence => true, :email => true
  devise :confirmable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_one :account, as: :user
  has_one_attached :avatar
  validates :terms_and_conditions, acceptance: { message: 'must be accepted.' }
end
