class AddTermsAndConditionsToBuyer < ActiveRecord::Migration[5.2]
  def change
    add_column :buyers, :terms_and_conditions, :boolean
  end
end
