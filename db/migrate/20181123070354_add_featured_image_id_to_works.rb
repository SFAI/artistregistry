class AddFeaturedImageIdToWorks < ActiveRecord::Migration[5.2]
  def change
    add_column :works, :featured_image_id, :integer
  end
end
