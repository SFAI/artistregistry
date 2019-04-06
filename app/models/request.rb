class Request < ApplicationRecord
  belongs_to :work
  belongs_to :buyer
  belongs_to :artist
  has_one :receipt
  enum types: { sale: 0, rental: 1, exhibition: 2, other: 3 }
end