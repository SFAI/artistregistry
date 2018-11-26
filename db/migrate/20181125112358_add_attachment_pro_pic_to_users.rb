class AddAttachmentProPicToUsers < ActiveRecord::Migration[5.2]
  def self.up
    change_table :artists do |t|
      t.attachment :pro_pic
    end
  end

  def self.down
    remove_attachment :artists, :pro_pic
  end
end
