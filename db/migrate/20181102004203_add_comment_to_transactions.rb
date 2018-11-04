class AddCommentToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :comment, :text
  end
end
