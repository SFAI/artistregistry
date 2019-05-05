class Work < ApplicationRecord
  belongs_to :artist
  has_many_attached :images

  has_many :requests, :dependent => :destroy
  has_many :buyers, through: :requests, :dependent => :destroy

  has_one :featured_image, :class_name => "Image", :foreign_key => "featured_image_id"

  enum availability: { active: 0, sold: 1, rented: 2 }
  enum media: { ceramics: 0, sculpture: 1, painting: 2, print:3, multiple_media: 4, craft: 5, photography: 6, film: 7, conceptual: 8, text: 9, other: 10 }
end
