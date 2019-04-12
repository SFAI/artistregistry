class ArtistPolicy < ApplicationPolicy

  def update?
    user.present? && user.account.user_type == "Artist" && resource.id == user.id || user.account.user_type == "Admin" 
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
