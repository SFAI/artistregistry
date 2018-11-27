class AddDescriptionToWorks < ActiveRecord::Migration[5.2]
  def change
    add_column :works, :description, :string
  end
end
