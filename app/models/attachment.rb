class Attachment < ApplicationRecord
  belongs_to :work
  has_attached_file :image
end
