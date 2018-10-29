class Work < ApplicationRecord
  belongs_to :artist
  has_many :requests
  has_many :buyers, through: :requests
  has_many_attached :images 
  enum status: { active: 0, sold: 1, rented: 2 }
  enum work_type: { painting: 0, photography: 1, sculpture: 2, prints:3, film: 4, design: 5 }
end
