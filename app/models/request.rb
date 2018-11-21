class Request < ApplicationRecord
  belongs_to :work
  belongs_to :buyer
  belongs_to :artist
  has_one :receipt
end
