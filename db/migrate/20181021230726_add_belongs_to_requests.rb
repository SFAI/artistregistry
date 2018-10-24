class AddBelongsToRequests < ActiveRecord::Migration[5.2]
  def change
    add_reference :requests, :buyer, foreign_key: true
    add_reference :requests, :work, foreign_key: true
  end
end
