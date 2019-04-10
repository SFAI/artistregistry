class WorkPolicy < ApplicationPolicy

  def create?
    user.present? && user.account.user_type == "Artist" && resource.artist_id == user.id
  end

  def update?
    create? || user.account.user_type == "Admin" 
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
