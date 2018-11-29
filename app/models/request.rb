class Request < ApplicationRecord
  belongs_to :work
  belongs_to :buyer
  belongs_to :artist
  has_one :receipt
  enum types: { sale: 0, rental: 1, commission: 2, exhibition: 3, other: 4 }
end