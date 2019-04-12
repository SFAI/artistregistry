class AddAccountsToAdmins < ActiveRecord::Migration[5.2]
  def change
  	add_reference :admins, :account
  end
end
