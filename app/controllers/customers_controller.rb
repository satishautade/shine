class CustomersController < ApplicationController
  def index
    if params[:keywords].present?
      @keywords = params[:keywords]
      customers_search_term = CustomerSearchTerm.new(@keywords)
      @customers = Customer.where(
          customers_search_term.where_clause,
          customers_search_term.where_args).
          order(customers_search_term.order)
    else
      @customers = []
    end
  end
end