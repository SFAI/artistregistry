class ChangeProgramInArtists < ActiveRecord::Migration[5.2]
  def change
    change_column :artists, :program, :integer, array:true, default: []
  end
end
