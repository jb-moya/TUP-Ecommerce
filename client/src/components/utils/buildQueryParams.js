const buildQueryParam = (key, value) => (value ? `${key}=${value}` : "");
const buildQueryArrayParam = (key, array) =>
    array.length > 0 ? `${key}=${array.join(",")}` : "";

export { buildQueryParam, buildQueryArrayParam };
