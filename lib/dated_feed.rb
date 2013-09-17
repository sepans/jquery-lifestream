module DatedFeed

  def self.included(base)
    base.extend(ClassAndInstanceMethods)
  end

  def format_date(datetime, date_string_format="%-m/%d")
    self.format_date(datetime, date_string_format)
  end

  module ClassAndInstanceMethods
    def format_date(datetime, date_string_format="%-m/%d")
      {
        :epoch => datetime.to_i,
        :date_time => datetime.rfc3339,
        :date_string => datetime.strftime(date_string_format)
      }
    rescue NoMethodError
      {
        :epoch => nil,
        :date_time => nil,
        :date_string => nil
      }
    end
  end
end
