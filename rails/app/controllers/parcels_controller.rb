class ParcelsController < ActionController::Base # ApplicationController
  def index
    @parcel = Parcel
        .select('gid, geojson, muni, site_addr,pinnum')
        .where("ST_Contains(geom, ST_SetSRID(ST_MakePoint(#{params[:lng]}, #{params[:lat]}), 4326))")
        #.where("(poly_typ='FEE' OR poly_typ='TAX' OR poly_typ='Boston_poly') AND ST_Contains(geom, ST_SetSRID(ST_MakePoint(#{params[:lng]}, #{params[:lat]}), 4326))")
    respond_to do |format|
      format.jsonapi { render jsonapi: @parcel }
    end
  end
end
