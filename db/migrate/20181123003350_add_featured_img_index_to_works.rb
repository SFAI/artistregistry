class AddFeaturedImgIndexToWorks < ActiveRecord::Migration[5.2]
  def change
    add_column :works, :featured_img_index, :integer
  end
end
