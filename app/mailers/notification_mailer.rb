class NotificationMailer < ApplicationMailer
  def new_request_email
    @artist = params[:artist]
    @buyer = params[:buyer]
    @work = params[:work]
    mail(to: @artist.email, subject: 'New Request Opened')
  end

  def request_closed_email
    @artist = params[:artist]
    @buyer = params[:buyer]
    @work = params[:work]
    mail(to: @buyer.email, subject: 'Request Closed')
  end

  def request_completed_email
    @artist = params[:artist]
    @buyer = params[:buyer]
    @work = params[:work]
    mail(to: @buyer.email, subject: 'Request Completed')


end
