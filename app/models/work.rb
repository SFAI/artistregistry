class Work < ApplicationRecord
  belongs_to :artist
  has_many_attached :images

  has_many :requests, :dependent => :destroy
  has_many :buyers, through: :requests, :dependent => :destroy

  has_one :featured_image, :class_name => "Image", :foreign_key => "featured_image_id"

  enum availability: { Active: 0, Sold: 1, Rented: 2 }
  enum media: { Ceramics: 0, Sculpture: 1, Painting: 2, Print:3,  Multiple_Media: 4, Craft: 5, Photography: 6, Film: 7, Other: 8 }
end
