class ChangeProgramInArtist < ActiveRecord::Migration[5.2]
  def change
    change_column :artists, :program, :string, array: true, default: []
  end
end
