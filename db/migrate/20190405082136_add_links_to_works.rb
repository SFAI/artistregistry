class AddLinksToWorks < ActiveRecord::Migration[5.2]
  def change
    add_column :works, :links, :string
  end
end
