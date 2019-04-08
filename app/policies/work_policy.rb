class WorkPolicy < ApplicationPolicy

  def create?
    user.present? && user.account.user_type == "Artist" && resource.artist_id == user.id
  end

  def update?
    create?
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
