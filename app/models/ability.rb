class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= Buyer.new
    case user
    when Artist
      can :manage, Work, artist_id: user.id
      can :read, Work
      can :create, Work
    when Buyer
      can :read, Work
    end
  end
end
