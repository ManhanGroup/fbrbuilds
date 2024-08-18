namespace :database do

  desc 'Fix Postgres ID sequences'
  task fix_seq_id: :environment do
    ActiveRecord::Base.connection.tables.each do |t|
      ActiveRecord::Base.connection.reset_pk_sequence!(t)
    end
  end

  desc 'Refresh calculated fields'
  task refresh_calculated_fields: :environment do
    start = Time.now
    ActiveRecord::Base.connection.exec_query 'VACUUM ANALYZE parcels;'
    puts "Vacuum analyzed parcels in #{Time.now - start} seconds"

    rpa_query = <<~SQL
      SELECT rpa.name as rpa_name, dev.id
      FROM rpas AS rpa
      JOIN developments AS dev
      ON ST_Intersects(ST_TRANSFORM(dev.point, 4269), rpa.shape);
    SQL
    county_query = <<~SQL
      SELECT cty.county, dev.id
      FROM counties AS cty
      JOIN developments AS dev
      ON ST_Intersects(ST_TRANSFORM(dev.point, 4269), cty.shape);
    SQL
    municipality_query = <<~SQL
      SELECT mni.namelsad as municipal, dev.id
      FROM places AS mni
      JOIN developments AS dev
      ON ST_Intersects(ST_TRANSFORM(dev.point, 4269), mni.geom);
    SQL
    n_transit_query = <<~SQL
      SELECT tsa.srvc_name, dev.id
      FROM tod_service_area_poly AS tsa
      JOIN developments AS dev
      ON ST_Intersects(dev.point, tsa.geom);
    SQL
    nhood_query = <<~SQL
      SELECT nhd.nhood_name, dev.id
      FROM neighborhoods_poly AS nhd
      JOIN developments AS dev
      ON ST_Intersects(dev.point, nhd.shape);
    SQL
    loc_id_query = <<~SQL
      SELECT pcl.gid as parloc_id, pcl.apn, dev.id
      FROM parcels AS pcl
      JOIN developments AS dev
      ON ST_Intersects(dev.point, pcl.geom);
    SQL
    taz_query = <<~SQL
    SELECT taz_number, geometry
    FROM tazs as tz
    JOIN developments as dev
    ON ST_Intersects(ST_TRANSFORM(dev.point,4269), tz.geometry);
    SQL

    timer = Time.now

    #rpa_result = ActiveRecord::Base.connection.exec_query(rpa_query).to_hash
    rpa_result = ActiveRecord::Base.connection.exec_query(rpa_query).to_a
    rpa_mapping = Hash.new
    rpa_result.each { |record| rpa_mapping[record['id']] = record['rpa_name'] }
    puts "Fetched RPA mapping in #{Time.now - timer} seconds"
    timer = Time.now

    #county_result = ActiveRecord::Base.connection.exec_query(county_query).to_hash
    county_result = ActiveRecord::Base.connection.exec_query(county_query).to_a
    county_mapping = Hash.new
    county_result.each { |record| county_mapping[record['id']] = record['county'] }
    puts "Fetched county mapping in #{Time.now - timer} seconds"
    timer = Time.now

    #municipality_result = ActiveRecord::Base.connection.exec_query(municipality_query).to_hash
    municipality_result = ActiveRecord::Base.connection.exec_query(municipality_query).to_a
    municipality_mapping = Hash.new
    municipality_result.each { |record| municipality_mapping[record['id']] = record['municipal'] }
    puts "Fetched municipality mapping in #{Time.now - timer} seconds"
    timer = Time.now

    #n_transit_result = ActiveRecord::Base.connection.exec_query(n_transit_query).to_hash
    n_transit_result = ActiveRecord::Base.connection.exec_query(n_transit_query).to_a
    n_transit_mapping = Hash.new
    n_transit_result.each do |record|
      if n_transit_mapping[record['id']]
        n_transit_mapping[record['id']].push(record['srvc_name'])
      else
        n_transit_mapping[record['id']] = [record['srvc_name']]
      end
    end
    puts "Fetched nearest transit mapping in #{Time.now - timer} seconds"
    timer = Time.now

    #nhood_result = ActiveRecord::Base.connection.exec_query(nhood_query).to_hash
    nhood_result = ActiveRecord::Base.connection.exec_query(nhood_query).to_a
    nhood_mapping = Hash.new
    nhood_result.each { |record| nhood_mapping[record['id']] = record['nhood_name'] }
    puts "Fetched neighborhood mapping in #{Time.now - timer} seconds"
    timer = Time.now

     taz_result = ActiveRecord::Base.connection.exec_query(taz_query).to_a
     taz_mapping = Hash.new
     taz_result.each { |record| taz_mapping[record['id']] = record['taz_number'] }
     puts "Fetched taz mapping in #{Time.now - timer} seconds"
     timer = Time.now

    #loc_id_result = ActiveRecord::Base.connection.exec_query(loc_id_query).to_hash
    loc_id_result = ActiveRecord::Base.connection.exec_query(loc_id_query).to_a
    loc_id_mapping = Hash.new
    loc_id_result.each { |record| loc_id_mapping[record['id']] = record['parloc_id'] }
    loc_apn_mapping = Hash.new
    loc_id_result.each { |record| loc_apn_mapping[record['id']] = record['apn'] }
    
    puts "Fetched parcel mapping in #{Time.now - timer} seconds"

    Parallel.each(Development.all, in_threads: 3) do |development|
      ActiveRecord::Base.connection_pool.with_connection do
        development.update_columns(
          rpa_name: rpa_mapping[development.id],
          county: county_mapping[development.id],
          municipal: municipality_mapping[development.id],
          n_transit: n_transit_mapping[development.id],
          nhood: nhood_mapping[development.id],
          taz:taz_mapping[development.id],
          loc_id: loc_id_mapping[development.id],  
          apn: loc_apn_mapping[development.id]         
        )
        print '.'
      end
    end
    puts "Finished in #{Time.now - start} seconds"
  end

  task populate_long_lat: :environment do
    Development.all.each do |development|
      point = development.point
      development.update_columns(
        latitude: point.y,
        longitude: point.x
      )
    end
  end

end
