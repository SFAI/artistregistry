class ArtistSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :program, :genres, :description, :pro_pic_url

  def pro_pic_url
    puts "--------OBJECT PRO_PIC--------"
    puts object.pro_pic.attached
    if object.pro_pic.attached?
      variant = object.pro_pic.variant(resize: "100x100")
      return rails_representation_url(variant, only_path:true)
    else
      return ''
    end
  end
end
