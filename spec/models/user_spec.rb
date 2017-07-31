require 'rails_helper'

describe User do
  describe "email"  do
    let(:user){
      User.create!(email: 'foo@example.com',
                    password: "qwertyuiop",
                    password_confirmation: "qwertyuiop")
    }
    it "should prevent invalid email addresses" do
      expect{
        user.update_attribute('email', 'foo@something.com')
      }.to raise_error(ActiveRecord::StatementInvalid, /email_must_be_company_email/)
    end

  end
end
