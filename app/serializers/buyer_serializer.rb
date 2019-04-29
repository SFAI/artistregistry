class BuyerSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :email, :created_at, :updated_at, :name, :phone_number, :avatar, :account_id, :locked_at

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
