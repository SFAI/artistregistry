class AddHiddenToWorks < ActiveRecord::Migration[5.2]
  def change
    add_column :works, :hidden, :boolean
  end
end
