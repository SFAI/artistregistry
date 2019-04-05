require_dependency '../validators/email_validator.rb'
class Artist < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  validates :email, :presence => true, :email => true
  devise :confirmable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :lockable
  has_one :account, as: :user
  has_many :works
  has_one :featured_work, :class_name => 'Work', :foreign_key => "featured_work_id"
  has_many :requests
  has_many :commissions
  has_many :buyers, through: :commissions
  has_one_attached :avatar
  validates :terms_and_conditions, acceptance: { message: 'must be accepted.' }
  # TODO: add "Name" field to sign-up so this line is needed again
  # validates :name, presence: true, uniqueness: true


  enum program: { art_and_technology: 0, film: 1, history_and_theory_of_contemporary_art: 2, new_genres: 3, painting: 4, photography: 5, printmaking: 6, sculpture: 7 }
end
