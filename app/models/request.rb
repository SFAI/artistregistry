class Request < ApplicationRecord
  belongs_to :artist
  belongs_to :buyer
  has_one :work

end
