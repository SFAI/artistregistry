class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    if user.is_a?(Buyer)
        can :manage, Commission, id: user.id
        can :read, Request, id: user.id
        can :manage, Buyer, id: user.id
        # add transaction and notification permissions
    elsif user.is_a?(Artist)
        can :manage, Work, id: user.id
        can :manage, Request, id: user.id
        can :read, Commission, id: user.id
        can :manage, Artist, id: user.id
        # add transaction and notification permissions
    end
    can :read, Work
    can :read, Buyer
    can :read, Artist
  end
end
