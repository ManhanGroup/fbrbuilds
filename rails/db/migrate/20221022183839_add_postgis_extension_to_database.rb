class AddPostgisExtensionToDatabase < ActiveRecord::Migration[7.0]
  def change
    execute <<-SQL
      CREATE EXTENSION IF NOT EXISTS postgis
      SCHEMA public;
    SQL
    #enable_extension 'postgis'
  end
end
