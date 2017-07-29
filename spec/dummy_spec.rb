require 'rails_helper.rb'

describe "Testing that RSpec is configured" do
  it "Should PASS" do
    expect(true).to be(true)
  end

  it "Should FAIL" do
    expect(true).to be(false)
  end
end

