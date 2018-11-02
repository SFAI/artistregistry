class AddWorkToAttachment < ActiveRecord::Migration[5.2]
  def change
    add_reference :attachments, :work, foreign_key: true
  end
end
