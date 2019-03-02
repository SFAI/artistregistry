class AddTermsAndConditionsToArtist < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :terms_and_conditions, :boolean
  end
end
