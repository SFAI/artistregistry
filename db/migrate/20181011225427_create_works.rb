class CreateWorks < ActiveRecord::Migration[5.2]
  def change
    create_table :works do |t|
      t.string :title
      t.text :media
      t.integer :type
      t.integer :status
      t.decimal :price
      t.references :artist, foreign_key: true, index: true, null: false
    end
  end
end
