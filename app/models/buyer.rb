class Buyer < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :confirmable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :requests
  has_many :works, through: :requests
  has_many :commissions
  has_many :artists, through: :commissions
  has_one_attached :avatar
  validates :name, presence: true, uniqueness: true
end
