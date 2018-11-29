class ChangeColumnsInWorksAndArtists < ActiveRecord::Migration[5.2]
  def change
    change_column :artists, :program, 'integer USING CAST(program AS integer)'
    rename_column :artists, :genres, :media
    rename_column :works, :medium, :media
    add_column :artists, :year, :integer
  end
end
