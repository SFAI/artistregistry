class Request < ApplicationRecord
  belongs_to :work
  belongs_to :buyer
  has_one :artist, through: :work

end
