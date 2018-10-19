class CommissionsController < ApplicationController
  before_action :set_commission, only: [:show, :edit, :update, :destroy]

  # GET /commissions
  # GET /commissions.json
  def index
    @commissions = Commission.all
  end

  # GET /commissions/1
  # GET /commissions/1.json
  def show
  end

  # GET /commissions/new
  def new
    @commission = Commission.new
  end

  # GET /commissions/1/edit
  def edit
  end

  # POST /commissions
  # POST /commissions.json
  def create
    commission = Commission.new(comment: params[:comment], buyer_id: current_user)
  	commission.save!
  end

  # PATCH/PUT /commissions/1
  # PATCH/PUT /commissions/1.json
  def update
  end

  # DELETE /commissions/1
  # DELETE /commissions/1.json
  def destroy
    @commission.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_commission
      @commission = Commission.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def commission_params
      params.fetch(:commission, {})
    end
end
