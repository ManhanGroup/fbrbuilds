class RemoveUnusedFieldsFromParcels < ActiveRecord::Migration[7.0]
  def change
    remove_column :parcels, :mapc_id
    remove_column :parcels, :map_num
    remove_column :parcels, :mappar_id
    remove_column :parcels, :loc_id_cnt
    remove_column :parcels, :land_value
    remove_column :parcels, :bldg_value
    remove_column :parcels, :othr_value
    remove_column :parcels, :total_valu
    remove_column :parcels, :ls_price
    remove_column :parcels, :ls_date
    remove_column :parcels, :bldg_area
    remove_column :parcels, :res_area
    remove_column :parcels, :luc_1
    remove_column :parcels, :luc_2
    remove_column :parcels, :luc_adj_1
    remove_column :parcels, :luc_adj_2
    remove_column :parcels, :num_units
    remove_column :parcels, :units_est
    remove_column :parcels, :units_src
    remove_column :parcels, :num_rooms
    remove_column :parcels, :yr_built
    remove_column :parcels, :owner_name
    remove_column :parcels, :owner_addr
    remove_column :parcels, :owner_city
    remove_column :parcels, :owner_stat
    remove_column :parcels, :owner_zip
    remove_column :parcels, :fy
    remove_column :parcels, :lot_areaft
    remove_column :parcels, :far
    remove_column :parcels, :pct_imperv
    remove_column :parcels, :pct_bldg
    remove_column :parcels, :pct_pave
    remove_column :parcels, :landv_pac
    remove_column :parcels, :bldgv_psf
    remove_column :parcels, :totv_pac
    remove_column :parcels, :bldlnd_rat
    remove_column :parcels, :sqm_imperv
    remove_column :parcels, :sqm_bldg
    remove_column :parcels, :sqm_pave
    remove_column :parcels, :realesttyp
    remove_column :parcels, :shape_leng
    remove_column :parcels, :shape_area
    remove_column :parcels, :parloc_id
    remove_column :parcels, :muni_id
    remove_column :parcels, :addr_str
    remove_column :parcels, :addr_num
  end
end
