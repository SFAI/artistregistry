class Transaction < ApplicationRecord
  belongs_to :work
  belongs_to :buyer
  belongs_to :artist
end
