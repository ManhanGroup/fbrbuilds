require 'csv'
namespace :import do

  desc 'Perform all import tasks in proper order'
  task in_order: :environment do
    puts 'import:user_data'
    Rake::Task["import:user_data"].invoke

    puts 'import:development_data'
    Rake::Task["import:development_data"].invoke

    puts 'database:fix_seq_id'
    Rake::Task["database:fix_seq_id"].invoke

    puts 'import:developer_name_data'
    Rake::Task["import:developer_name_data"].invoke

    puts 'import:development_municipalities'
    Rake::Task["import:development_municipalities"].invoke
  end

  desc 'Updates the values of a column using the JFMD2018ZF.csv file'
  task :repopulate_column, [:col] => [:environment] do |t, args|
    csv_text = File.read(Rails.root.join('lib', 'import', 'developments_backup20280823.csv'))
    csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')

    id = 1
    csv.each do |row|
      Development.find(id).update_attribute(args[:col], row[args[:col]])

      id += 1
    end
  end

  desc 'Import previous development data'
  task development_data: :environment do
    csv_text = File.read(Rails.root.join('lib', 'import', 'developments_backup20280823.csv'))
    csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')

    def to_bool(x)
      return x.to_s.downcase == "true"
    end

    csv.each do |row|
      development = Development.new(
        #id: row['project_id'], # in export make sure we use project_id for this
        user_id: row["user_id"],
        rdv: to_bool(row["rdv"]),
        asofright: to_bool(row["asofright"]),
        ovr55: to_bool(row["ovr55"]),
        clusteros: to_bool(row["clusteros"]),
        phased: to_bool(row["phased"]),
        stalled: to_bool(row["stalled"]),
        name: row["name"],
        status: row["status"],
        descr: row["descr"],
        prj_url: row["prj_url"],
        address: row["address"],
        state: row["state"],
        zip_code: row["zip_code"],
        year_compl: row["year_compl"],
        prjarea: row["prjarea"],
        singfamhu: row["singfamhu"],
        multifam: row["multifam"],
        hu: row["hu"],
        gqpop: row["gqpop"],
        rptdemp: row["rptdemp"],
        commsf: row["commsf"],
        hotelrms: row["hotelrms"],
        total_cost: row["total_cost"],
        ret_sqft: row["ret_sqft"],
        ofcmd_sqft: row["ofcmd_sqft"],
        indmf_sqft: row["indmf_sqft"],
        whs_sqft: row["whs_sqft"],
        rnd_sqft: row["rnd_sqft"],
        ei_sqft: row["ei_sqft"],
        other_sqft: row["other_sqft"],
        hotel_sqft: row["hotel_sqft"],
        other_rate: row["other_rate"],
        affordable: row["affordable"],
        latitude: row["latitude"],
        longitude: row["longitude"],
        parcel_id: row["parcel_id"],
        mixed_use: to_bool(row["mixed_use"]),
        point: row["point"],
        programs: row["programs"],
        forty_b: row["forty_b"],
        residential: row["residential"],
        commercial: row["commercial"],
        municipal: row["municipal"],
        devlper: row["devlper"],
        yrcomp_est: to_bool(row["yrcomp_est"]),
        percomp_25: row['percomp_25'],
        percomp_30: row['percomp_30'],
        percomp_35: row['percomp_35'],
        percomp_40: row['percomp_40'],
        percomp_45: row['percomp_45'],
        units_1bd: row["units_1bd"],
        units_2bd: row["units_2bd"],
        units_3bd: row["units_3bd"],
        unknownhu: row['unknownhu'],
        affrd_unit: row["affrd_unit"],
        aff_u50: row["aff_u50"],        
        aff_50_80: row["aff_50_80"],
        aff_80_120: row["aff_80_120"],
        aff_120p: row["aff_120p"],
        aff_unknown: row["aff_unknown"],
        headqtrs: to_bool(row["headqtrs"]),
        park_type: row["park_type"],
        sb_type: row["sb_type"],
        publicsqft: row["publicsqft"],
        unk_sqft: row["unk_sqft"],
        loc_id: row["loc_id"],
        parcel_fy: row["parcel_fy"],
        rpa_name: row["rpa_name"],
        county: row["county"],
        nhood: row["nhood"],
        n_transit: row["n_transit"],
        flag: row["flag"],
        deleted_at: row["deleted_at"],
        traffic_count_data: row["traffic_count_data"],
        proj_id_present: to_bool(row["proj_id_present"]),
        traffic_count_data_present: to_bool(row["traffic_count_data_present"]),
        taz: row["taz"],
        apn: row["apn"],
        trunc: row["trunc"],
        gluc: row["gluc"],
        placetype: row["placetype"],
        proj_id: row["proj_id"],
        stat_comts: row["stat_comts"],
        mix_descr: row["mix_descr"],
        rhna: row["rhna"],
        ab1317: row["ab1317"],
        notes: row["notes"],
        created_at: row["created_at"],
        updated_at: row["updated_at"] 
      )
      development.save(validate: false)
    end
  end

  desc 'Import previous development data'
  task development_municipalities: :environment do
    Development.where(municipal: nil).each do |development|
      municipal = find_municipality(development)
      next if municipal.blank?
      development.update(municipal: municipality[0]['municipal'])
    end
  end

  desc 'Import previous user data'
  task user_data: :environment do
    csv_text = File.read(Rails.root.join('lib', 'import', 'users.csv'))
    csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')
    csv.each do |row|
      user = User.create!(
        id: row['id'],
        email: row['email'],
        password: 'temporary_password',
        sign_in_count: row['sign_in_count'],
        created_at: row['created_at'],
        first_name: row['first_name'],
        last_name: row['last_name'],
        agency: row['agency']
        )
      user.update_attribute(:encrypted_password, row['encrypted_password'])
    end
  end

  desc 'Import developer names'
  task developer_name_data: :environment do
    # SELECT development_id, organizations.name
    # FROM development_team_memberships
    # INNER JOIN organizations
    # ON development_team_memberships.organization_id = organizations.id;
    csv_text = File.read(Rails.root.join('lib', 'import', 'developer_names.csv'))
    csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')
    csv.each do |row|
      Development.find(row['development_id']).update(devlper: row['name'])
    end
  end

  private

  def find_municipality(development)
    municipality_query = <<~SQL
      SELECT municipal
      FROM
        (SELECT namelsad as municipal, ST_TRANSFORM(m.geom, 4326) as geom FROM places) municipality,
        (SELECT id, name, point FROM developments) development
        WHERE ST_Intersects(development.point, municipality.geom)
        AND id = #{development.id};
    SQL
    ActiveRecord::Base.connection.exec_query(municipality_query).to_hash
  end

  def convert_srid(point)
    return nil if point.match(/POINT\(\d+\.\d+\s\d+\.\d+\)/).to_s.blank?
    conversion_query = <<~SQL
      SELECT ST_AsText(ST_Transform(ST_GeomFromText('#{point.match(/POINT\(\d+\.\d+\s\d+\.\d+\)/).to_s}',26986),4326)) As wgs_geom;
    SQL
    ActiveRecord::Base.connection.exec_query(conversion_query).to_hash[0]["wgs_geom"]
  end
end
