class ArtistSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :email, :created_at, :updated_at, :name, :program, :open_to_commissions, :media, :description, :avatar, :featured_work_id, :year, :hidden, :locked_at, :account_id

  has_many :works

  def avatar
    if object.avatar.attached?
      avatar = object.avatar
      return {
        name: avatar.filename,
        url: rails_blob_path(avatar, :host => 'localhost'),
      }
    else
      return ''
    end
  end

end
