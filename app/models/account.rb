class Account < ApplicationRecord
	belongs_to :user, polymorphic: true
	has_many :blocker_relationships, foreign_key: :blocked_id, class_name: 'Block'
	has_many :blocker, through: :blocker_relationships, source: :blocker

	has_many :blocked_relationships, foreign_key: :blocker_id, class_name: 'Block'
	has_many :blocked, through: :blocked_relationships, source: :blocked
end
