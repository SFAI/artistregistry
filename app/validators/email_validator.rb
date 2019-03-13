require 'mail'
class EmailValidator < ActiveModel::EachValidator
  def validate_each(record,attribute,value)
    begin
      m = Mail::Address.new(value)
      r = m.domain.present? && (m.domain.match('^artists\.sfai\.edu$') || m.domain.match('^sfai\.edu$')) && m.address == value
      # NOTE: In the future, open up to '^alumni\.sfai\.edu$'.
    rescue
      r = false
    end
    record.errors[attribute] << (options[:message] || "is invalid") unless r
  end
end
