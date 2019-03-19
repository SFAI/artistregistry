class Account < ApplicationRecord
	belongs_to :user, polymorphic: true
end
