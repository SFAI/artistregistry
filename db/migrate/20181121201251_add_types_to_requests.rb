class AddTypesToRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :requests, :types, :integer
  end
end
