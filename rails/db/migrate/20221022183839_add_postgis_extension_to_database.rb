class AddPostgisExtensionToDatabase < ActiveRecord::Migration[7.0]
  def change
    # create a heroku_ext schema
    execute <<-SQL
      CREATE schema public;
    SQL
    
    execute <<-SQL
      CREATE EXTENSION IF NOT EXISTS postgis
      SCHEMA public;
    SQL
    #enable_extension 'postgis'
  end
end
