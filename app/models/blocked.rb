class Blocked < ApplicationRecord
	belongs_to :blocking_user1, :polymorphic => true
	belongs_to :blocking_user2, :polymorphic => true
	enum blocking_source: { user1: 0, user2: 1, both: 2 }
end
