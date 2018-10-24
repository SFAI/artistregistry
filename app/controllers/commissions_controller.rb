class CommissionsController < ApplicationController
  before_action :set_commission, only: [:show, :edit, :update, :destroy]

  def index
    @commissions = Commission.all
  end

  def show

  end

  def new
    @commission = Commission.new
  end

  def edit
  end

  def create
    commission = Commission.new(commission_params)
  	commission.save!
  end

  def update
  end

  def destroy
    @commission.destroy
  end

  private
    def set_commission
      @commission = Commission.find(params[:id])
    end

    def commission_params
      params.permit(
        :buyer_id,
        :artist_id,
        :comment
      )
    end
end
