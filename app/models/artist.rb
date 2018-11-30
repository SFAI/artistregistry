require_dependency '../validators/email_validator.rb'
class Artist < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  validates :email, :presence => true, :email => true
  devise :confirmable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :works
  has_one :featured_work, :class_name => 'Work', :foreign_key => "featured_work_id"
  has_many :requests
  has_many :commissions
  has_many :buyers, through: :commissions
  has_one_attached :avatar
  validates :name, presence: true, uniqueness: true

  enum program: { art_and_technology: 0, film: 1, history_and_theory: 2, new_genres: 3, painting: 4, photography: 5, printmaking: 6, sculpture: 7 }
end
