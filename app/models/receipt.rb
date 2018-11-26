class Receipt < ApplicationRecord
  belongs_to :request
  enum transaction_type: { purchase: 0, rental: 1 }
end
