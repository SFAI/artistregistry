class AddMetadataToWorks < ActiveRecord::Migration[5.2]
  def change
    add_column :works, :year, :integer
    add_column :works, :dimensions, :string
  end
end
