class AddGeojsonColumnToPlaces < ActiveRecord::Migration[7.0]
  def change
    add_column :places, :geojson, :json
  end
end
