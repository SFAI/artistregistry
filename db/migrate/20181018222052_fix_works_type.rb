class FixWorksType < ActiveRecord::Migration[5.2]
  def change
    rename_column :works, :type, :work_type
  end
end
