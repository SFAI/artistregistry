class CreateBlockJoinTable < ActiveRecord::Migration[5.2]
  def change
  	create_table 'blocks' do |t|
      t.integer 'blocker_id', :null => false
      t.integer 'blocked_id', :null => false
    end

    add_index :blocks, :blocker_id
    add_index :blocks, :blocked_id
    add_index :blocks, [:blocked_id, :blocker_id], unique: true
  end
end
