class ArtistSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :program, :genres, :description, :avatar_url

  def avatar_url
    if object.avatar
      variant = object.avatar.variant(resize: "100x100")
      return rails_representation_url(variant, only_path:true)
    else
      return ''
    end
  end
end
