require 'mail'
class EmailValidator < ActiveModel::EachValidator
  def validate_each(record,attribute,value)
    begin
      m = Mail::Address.new(value) 
      r = m.domain.present? && m.domain.match('^artists\.sfai\.edu$') && m.address == value
    rescue   
      r = false
    end
    record.errors[attribute] << (options[:message] || "is invalid") unless r
  end
end