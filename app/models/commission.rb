class Commission < ApplicationRecord
  belongs_to :artist
  belongs_to :buyer
  enum types: { exhibition: 0, commission: 1, other: 2 }
end
