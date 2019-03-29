class CommissionMailer < ApplicationMailer
  def new_commission_email
    @artist = params[:artist]
    @buyer = params[:buyer]
    mail(to: @artist.email, subject: 'New Commission Opened')
  end
end
