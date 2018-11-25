class Request < ApplicationRecord
  belongs_to :work
  belongs_to :buyer
  belongs_to :artist
  has_one :receipt
  enum types: { purchase: 0, rental: 1 }
end
