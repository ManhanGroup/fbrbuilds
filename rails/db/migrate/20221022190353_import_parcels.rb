class ImportParcels < ActiveRecord::Migration[7.0]
    def up
    create_table "parcels", primary_key: "gid", id: :serial, force: :cascade do |t|
      t.decimal "objectid", precision: 10
      t.string "muni"
      t.string "site_addr", limit: 80
      t.string "addr_zip", limit: 12
      t.geometry "geom", limit: {:srid=>4326, :type=>"multi_polygon"}
      t.json "geojson"
      t.string "pinnum"
      t.string "agency"
      t.index ["geom"], name: "parcels_geom_idx", using: :gist
    end
    
  end
  def down
    drop_table :parcels
  end
end
