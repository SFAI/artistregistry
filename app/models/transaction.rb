class Transaction < ApplicationRecord
  belongs_to :work
  belongs_to :buyer
  belongs_to :artist
  enum types: { purchase: 0, rental: 1 }
end
