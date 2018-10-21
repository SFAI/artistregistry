class Artist < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  validates: email, :presence => true, :email => true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :works
  has_many :requests
  has_many :buyers, through: :requests
  has_many :buyers, through: :commissions
end
