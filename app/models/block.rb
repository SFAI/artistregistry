class Block < ApplicationRecord
  belongs_to :blocker, foreign_key: 'blocker_id', class_name: 'Account'
  belongs_to :blocked, foreign_key: 'blocked_id', class_name: 'Account'
end
