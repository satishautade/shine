class CustomerSearchTerm
  attr_reader :where_clause, :where_args, :order

  def initialize(search_term)
    search_term = search_term.downcase
    @where_clause = ''
    @where_args = {}
    if (search_term =~ /@/)
      build_search_with_name_and_email(search_term)
    else
      build_search_with_first_and_last_name(search_term)
    end
  end

  def build_search_with_first_and_last_name(key)
    @where_clause << case_insensitive_search(:first_name)
    @where_args[:first_name] = starts_with(key)

    @where_clause << "OR #{case_insensitive_search(:last_name)}"
    @where_args[:last_name] = starts_with(key)

    @order = 'last_name asc'
  end

  def case_insensitive_search(field_name)
    return "lower (#{field_name}) like :#{field_name} "
  end

  def starts_with(search_term)
    return search_term + '%'
  end

  def extract_name(email)
    email.gsub(/@.*$/, '').gsub(/[0-9]+/, '')
  end

  def build_search_with_name_and_email(key)
    @where_clause << case_insensitive_search(:first_name)
    @where_args[:first_name] = starts_with(extract_name(key))

    @where_clause << "OR #{case_insensitive_search(:last_name)}"
    @where_args[:last_name] = starts_with(extract_name(key))

    @where_clause << "OR #{case_insensitive_search(:email)}"
    @where_args[:email] = key

    @order = "lower(email) = " +
              ActiveRecord::Base.connection.quote(key) + ' desc, last_name asc'

  end

end