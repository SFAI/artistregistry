class AddDefaultToRequest < ActiveRecord::Migration[5.2]
  def change
    change_column_default(
      :requests,
      :open,
      true
    )
  end
end
