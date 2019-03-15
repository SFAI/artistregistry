class AddAccountsToBuyers < ActiveRecord::Migration[5.2]
  def change
  	add_reference :buyers, :account
  end
end
