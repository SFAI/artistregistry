class ReceiptPolicy < ApplicationPolicy

  def create?
    request = resource.request
    user.present? && user.account.user_type == "Artist" && request.artist_id == user.id
  end

  def update?
    create?
  end

  class Scope < Scope
    def resolve
      scope.joins(:requests).where(requests: {artist_id: user.id}).or(scope.joins(:requests).where(requests: {buyer_id: user.id}))
    end
  end
end
