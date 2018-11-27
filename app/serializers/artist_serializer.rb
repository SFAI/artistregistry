class ArtistSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :email, :created_at, :updated_at, :name, :program, :open_to_commissions, :genres, :description, :avatar, :featured_work_id

  has_many :works

  def avatar
    if object.avatar.attached?
      avatar = object.avatar
      payload = {
        name: avatar.filename,
        url: rails_blob_path(avatar, :host => 'localhost'),
      }
    else
      return ''
    end
  end

end
