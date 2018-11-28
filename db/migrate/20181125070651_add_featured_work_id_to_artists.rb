class AddFeaturedWorkIdToArtists < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :featured_work_id, :integer
  end
end
