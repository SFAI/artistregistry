class ApplicationPolicy
  attr_reader :user, :resource

  def initialize(user, resource)
    @user = user
    @resource = resource
  end

  # def index?
  #   false
  # end
  #
  # def show?
  #   false
  # end
  #
  # def create?
  #   false
  # end
  #
  # def new?
  #   create?
  # end
  #
  # def update?
  #   false
  # end
  #
  # def edit?
  #   update?
  # end
  #
  # def destroy?
  #   false
  # end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.all
    end
  end
end
