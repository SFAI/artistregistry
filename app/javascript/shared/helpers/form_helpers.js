function getCSRFFieldName() {
  return document.querySelector('meta[name="csrf-param"]').content
}

function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').content
}
export {
  getCSRFFieldName,
  getCSRFToken
}
