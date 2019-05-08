class ChangeColumnDefault < ActiveRecord::Migration[5.2]
  def change
    change_column_default :artists, :hidden, false
    change_column_default :works, :hidden, false
  end
end
