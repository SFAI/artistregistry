class AddTimestampsToRequests < ActiveRecord::Migration[5.2]
  def change
    add_timestamps :requests
  end
end
