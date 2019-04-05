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
      scope.all
    end
  end
end
