class BuyerPolicy < ApplicationPolicy

  def update?
    user.present? && user.account.user_type == "Buyer" && resource.id == user.id
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
