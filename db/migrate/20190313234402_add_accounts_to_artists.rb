class AddAccountsToArtists < ActiveRecord::Migration[5.2]
  def change
  	add_reference :artists, :account
  end
end
