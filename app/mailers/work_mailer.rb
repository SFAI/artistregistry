class WorkMailer < ApplicationMailer
  def work_status_changed
    @buyer = params[:buyer]
    @work = params[:work]
    @prev_status = params[:prev_status]
    @curr_status = params[:curr_status]
    mail(to: @buyer.email, subject: 'Requested Work Status Changed')
  end

  def work_flagged
    @user = params[:user]
    @work = params[:work]
    @text = params[:text]
    mail(to: "gcrawford@sfai.edu", subject: 'Work Flagged')
  end
end
