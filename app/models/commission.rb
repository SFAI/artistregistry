class Commission < ApplicationRecord
  belongs_to :artist
  belongs_to :buyer
end
