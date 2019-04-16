class WorkMailer < ApplicationMailer
  def work_status_changed
    @buyer = params[:buyer]
    @work = params[:work]
    @prev_status = params[:prev_status]
    @curr_status = params[:curr_status]
    mail(to: @buyer.email, subject: 'Requested Work Status Changed')
  end
end
