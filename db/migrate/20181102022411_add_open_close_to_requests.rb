class AddOpenCloseToRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :requests, :open, :boolean
  end
end
