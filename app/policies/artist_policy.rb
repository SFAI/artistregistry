class ArtistPolicy < ApplicationPolicy

  def update?
    user.present? && user.account.user_type == "Artist" && resource.id == user.id
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
