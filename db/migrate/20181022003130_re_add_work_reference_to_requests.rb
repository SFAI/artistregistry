class ReAddWorkReferenceToRequests < ActiveRecord::Migration[5.2]
  def change
    remove_reference :requests, :artist
    add_reference :requests, :work, foreign_key: true
  end
end
