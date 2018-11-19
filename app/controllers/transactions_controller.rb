class TransactionsController < ApplicationController
  def index
  end

  def show
  end

  def new
  end

  def get_transaction_type_enums
    # return type enums for dropdown
    types = Transaction.types
    render json: types
  end
end
