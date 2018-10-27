class RemoveWorkReferenceToRequestAddArtist < ActiveRecord::Migration[5.2]
  def change
    remove_reference :requests, :work
    add_reference :requests, :artist, foreign_key: true
  end
end
