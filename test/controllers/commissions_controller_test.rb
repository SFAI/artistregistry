require 'test_helper'

class CommissionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @commission = commissions(:one)
  end

  test "should get index" do
    get commissions_url
    assert_response :success
  end

  test "should get new" do
    get new_commission_url
    assert_response :success
  end

  test "should create commission" do
    assert_difference('Commission.count') do
      post commissions_url, params: { commission: {  } }
    end

    assert_redirected_to commission_url(Commission.last)
  end

  test "should show commission" do
    get commission_url(@commission)
    assert_response :success
  end

  test "should get edit" do
    get edit_commission_url(@commission)
    assert_response :success
  end

  test "should update commission" do
    patch commission_url(@commission), params: { commission: {  } }
    assert_redirected_to commission_url(@commission)
  end

  test "should destroy commission" do
    assert_difference('Commission.count', -1) do
      delete commission_url(@commission)
    end

    assert_redirected_to commissions_url
  end
end
