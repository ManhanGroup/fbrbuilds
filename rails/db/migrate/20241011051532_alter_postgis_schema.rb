class AlterPostgisSchema < ActiveRecord::Migration[7.0]
  def change
    execute <<-SQL
      alter extension postgis set schema public;
    SQL
  end
end
