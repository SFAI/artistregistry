class CommissionPolicy < ApplicationPolicy

  def create?
    user.present?
  end

  class Scope < Scope
    def resolve
      if user.present? && user.account.user_type == "artist"
        scope.where(artist_id: user.id)
      end
    end
  end
end
