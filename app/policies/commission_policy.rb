class CommissionPolicy < ApplicationPolicy

  def create?
    user.present?
  end

  class Scope < Scope
    def resolve
      scope.where(artist_id: user.id)
    end
  end
end
