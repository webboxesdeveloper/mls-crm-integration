export const sources = ["data_name", "name"];

export const dataMapping = {
  "ga_fmls": {
    "mls_name": "data_name",
    "mls_id": "vendor_id",
    "street_address": (data) => {
      const { street_number, street_name, street_suffix } = data.address_components;
      if (street_number && street_name && street_suffix) {
        return `${street_number} ${street_name} ${street_suffix}`;
      } else {
        return null;
      }
    },
    "city": "address_components.city",
    "state": "address_components.state",
    "zip_code": (data) => parseInt(data.address_components.zipcode, 10),
    "list_price": (data) => parseInt(data.list.replace(/[^\d]/g, ''), 10),
    "list_date": (data) => new Date(data.date).getTime() / 1000,
    "bedrooms": "property.bed_count",
    "full_baths": "property.bath_count",
    "half_baths": "property.half_bath_count",
    "size": "property.square_feet"
  },
  "ncsc_cmls": {
    "mls_name": "name",
    "mls_id": "id",
    "street_address": "geo.address",
    "city": "geo.city",
    "state": "geo.state",
    "zip_code": (data) => parseInt(data.geo.zip, 10),
    "list_price": (data) => parseInt(data.listing.price.replace(/[^\d]/g, ''), 10),
    "list_date": (data) => new Date(data.created).getTime() / 1000,
    "bedrooms": "listing.bedrooms",
    "full_baths": "listing.bathrooms",
    "half_baths": null,
    "size": "listing.square_feet"
  }
}