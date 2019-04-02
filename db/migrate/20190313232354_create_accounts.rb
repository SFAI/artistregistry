class CreateAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
    	t.belongs_to :user, polymorphic: true
    end
  end
end
