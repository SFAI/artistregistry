class Buyer < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :confirmable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_one :account, as: :user
  has_many :requests
  has_many :works, through: :requests
  has_many :commissions
  has_many :artists, through: :commissions
  has_one_attached :avatar
  validates :terms_and_conditions, acceptance: { message: 'must be accepted.' }
  # TODO: add "Name" field to sign-up so this line is needed again
  # validates :name, presence: true, uniqueness: true

end
