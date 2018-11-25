class Receipt < ApplicationRecord
  belongs_to :request
  enum types: { purchase: 0, rental: 1 }
end
