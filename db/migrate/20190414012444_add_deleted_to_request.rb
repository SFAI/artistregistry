class AddDeletedToRequest < ActiveRecord::Migration[5.2]
  def change
  	add_column :requests, :deleted, :boolean
  end
end
