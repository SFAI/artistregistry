class AddBlockingSourceToBlocked < ActiveRecord::Migration[5.2]
  def change
    add_column :blockeds, :blocking_source, :integer
  end
end
