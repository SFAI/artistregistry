class RenameAttachmentToImage < ActiveRecord::Migration[5.2]
  def change
    rename_table :attachments, :images
  end
end
