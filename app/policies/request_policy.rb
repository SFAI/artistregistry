class RequestPolicy < ApplicationPolicy

  def create?
    user.present?
  end

  def update?
    user.present? && user.account.user_type == "Artist" && resource.artist_id == user.id
  end

  class Scope < Scope
    def resolve
      if user.present?
        scope.where(artist_id: user.id)
        .or(scope.where(buyer_id: user.id))
      end
    end
  end
end
