class DevelopmentsController < ApplicationController
  before_action :set_development, only: %i[show edit update destroy]
  skip_before_action :authenticate_user!, only: %i[index show]

  # GET /developments
  def index
    authorize Development
    @developments = if params[:term]
                      Development.search_by_name_and_location(params[:term])
                    elsif params[:minLat] && params[:minLng] && params[:maxLat] && params[:maxLng]
                      Development.where('point && ST_MakeEnvelope(?, ?, ?, ?, 4326) ', params[:minLng], params[:minLat], params[:maxLng], params[:maxLat])
                    elsif params[:filter]
                      filtered_developments(params[:filter])
                    else
                      Development.where(filtered_params)
                    end
    respond_to do |format|
      format.jsonapi do
        scope = 'trunc' if params[:trunc]
        if scope == 'trunc'
          render json: TruncatedDevelopmentSerializer.new(@developments).serialized_json
        else
          render json: FullDevelopmentSerializer.new(@developments).serialized_json
        end
      end
      format.csv { send_data @developments.to_csv, filename: "fbrbuilds-#{Time.now.strftime('%Y%m%d')}.csv" }
      format.zip do
        file_name = @developments.to_shp
        send_file Rails.root.join('public', "#{file_name}.zip")
        # FileUtils.rm Rails.root.join('public', "#{file_name}.zip")
        FileUtils.rm Rails.root.join('public', "#{file_name}.shp")
        FileUtils.rm Rails.root.join('public', "#{file_name}.shx")
        FileUtils.rm Rails.root.join('public', "#{file_name}.dbf")
        FileUtils.rm Rails.root.join('public', "#{file_name}.cpg")
        FileUtils.rm Rails.root.join('public', "#{file_name}.prj")
      end
    end
  end

  # GET /developments/1
  def show
    authorize @development
    respond_to do |format|
      format.jsonapi { render json: FullDevelopmentSerializer.new(@development).serialized_json }
    end
  end

  # POST /developments
  def create
    @development = Development.new(development_params)
    authorize @development
    @development.user = current_user
    if @development.save
      respond_to do |format|
        format.jsonapi { render json: FullDevelopmentSerializer.new(@development).serialized_json }
      end
    else
      respond_to do |format|
        format.jsonapi { render json: @development.errors.full_messages, status: :bad_request }
      end
    end
  end

  # POST /developments/import
  def import
    respond_to do |format|
      format.jsonapi { render json: {
        result: Development.import( params[:filename], current_user )
      }.to_json }
    end
    # TODO: add exception handling
  end
  
  # PATCH/PUT /developments/1
  def update
    development_params.count === 1 && development_params[:flag] ? authorize(@development, :flag?) : authorize(@development)

    @development.attributes = development_params
    if @development.save(validate: !development_params[:flag])
      respond_to do |format|
        format.jsonapi { render json: FullDevelopmentSerializer.new(@development).serialized_json }
      end
    else
      respond_to do |format|
        format.jsonapi { head :bad_request }
      end
    end
  end

  # DELETE /developments/1
  def destroy
    authorize @development
    if @development.destroy
      respond_to do |format|
        format.jsonapi { head :no_content }
      end
    else
      respond_to do |format|
        format.jsonapi { head :bad_request }
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_development
    @development = Development.find(params[:id])
  end

  def filtered_params
    params.permit(:user_id, :rdv, :asofright, :ovr55, :clusteros, :phased, :stalled, :name, :status,:stat_comts,
                  :descr,:notes, :prj_url, :address, :state, :zip_code, :percomp_25,:percomp_30,:percomp_35,:percomp_40,
                  :percomp_45, :year_compl, :prjarea, :placetype, :singfamhu, :multifam,  :hu, :gqpop,
                  :rptdemp, :commsf, :hotelrms, :total_cost,
                  :ret_sqft, :ofcmd_sqft, :indmf_sqft,
                  :whs_sqft, :rnd_sqft, :ei_sqft, :other_sqft, :hotel_sqft, :other_rate, :affordable,
                  :latitude, :longitude, :parcel_id,:pinnum, :mixed_use,:mix_descr, :point, :programs, :forty_b, :residential,
                  :commercial, :municipal, :devlper, :yrcomp_est, :units_1bd, :units_2bd, :units_3bd,
                  :affrd_unit, :aff_u50, :aff_50_80, :aff_80_120, :aff_120p, :headqtrs, :park_type, :publicsqft,
                  :unknownhu, :aff_unknown, :unk_sqft, :flag, :traffic_count_data_present, :proj_id,:proj_id_present,
                  :traffic_count_data, :mf2_4,:mf5up,:mobile)
  end

  # Only allow a trusted parameter "white list" through.
  def development_params
    respond_to do |format|
      format.jsonapi do
        ActiveModelSerializers::Deserialization.jsonapi_parse(params,
                                                              only: %i[user_id rdv asofright ovr55 clusteros phased stalled name status stat_comts
                                                                       descr notes prj_url address state zip_code percomp_25 percomp_30 percomp_35
                                                                       percomp_40 percomp_45 year_compl prjarea placetype singfamhu multifam hu gqpop
                                                                       rptdemp commsf hotelrms  total_cost
                                                                       ret_sqft ofcmd_sqft indmf_sqft
                                                                       whs_sqft rnd_sqft ei_sqft other_sqft hotel_sqft other_rate affordable
                                                                       latitude longitude parcel_id pinnum mixed_use mix_descr point programs forty_b residential
                                                                       commercial municipal devlper yrcomp_est units_1bd units_2bd units_3bd
                                                                       affrd_unit aff_u50 aff_50_80 aff_80_120 aff_120p headqtrs park_type sb_type publicsqft
                                                                       unknownhu aff_unknown unk_sqft flag proj_id traffic_count_data proj_id_present traffic_count_data_present
                                                                       mf2_4 mf5up mobile ispublic])
      end
    end
  end

  # Builds a SQL query to filter developments by query parameters
  def filtered_developments(filter_hash)
    sql = []
    values = []

    filter_hash = JSON.parse(filter_hash) if filter_hash.is_a? String

    filter_hash.values.each do |filter|
      column = filter['col']

      if column=='municipal'
        sql << '(' + filter['value'].map { |_| "lower(#{column}) = lower(?)" }.join(' OR ') + ')'
        values = [*values, *filter['value']]
      elsif filter['filter'] == 'discrete'
        sql << '(' + filter['value'].map { |_| "#{column} = ?" }.join(' OR ') + ')'
        values = [*values, *filter['value']]

      else # metric
        type = filter['type']
        value = filter['value']
        inflector = %w[boolean string].include?(type) ? '=' : filter['inflector']

        unless ['=', '<', '>'].include?(inflector) &&
               (
                (type == 'string') ||
                (type == 'number' && /\A[-+]?\d+\z/.match(value.to_s)) ||
                (type == 'boolean' && %w[boolean string boolean string true false].include?(value))
              )

          next
        end

        sql << "#{column} #{inflector} ?"
        values << value
      end
    end

    Development.where(sql.join(' AND '), *values)
  end
end
