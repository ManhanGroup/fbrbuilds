class ParcelSerializer < ActiveModel::Serializer
  attributes :gid, :geojson, :muni, :pinnum, :site_addr
end
