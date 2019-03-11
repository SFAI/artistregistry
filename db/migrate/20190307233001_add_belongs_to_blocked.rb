class AddBelongsToBlocked < ActiveRecord::Migration[5.2]
  def change
  	add_reference :blocked, :blocking_user1, polymorphic: true, index: true
  	add_reference :blocked, :blocking_user2, polymorphic: true, index: true
  end
end
