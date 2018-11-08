class ChangeColumnsInWorks < ActiveRecord::Migration[5.2]
  def change
    rename_column :works, :media, :material
    rename_column :works, :work_type, :medium
    rename_column :works, :status, :availability
  end
end
