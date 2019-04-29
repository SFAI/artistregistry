class AddProgramToArtists < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :program, :string, array: true, default: []
  end
end
