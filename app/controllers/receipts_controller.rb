class ReceiptsController < ApplicationController
  def index
  end

  def show
  end

  def new
  end

  def get_receipt_type_enums
    # return type enums for dropdown
    types = Receipt.types
    render json: types
  end
end
