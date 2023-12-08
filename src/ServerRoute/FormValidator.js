export const ErrorValidator = (value) => {
  const error = {}
  if (!value.title) {
    error.title = 'title is required !'
  }
  if (!value.description) {
    error.description = 'description is required'
  }
  if (!value.slug) {
    error.slug = 'slug is required !'
  }
  if (!value.image) {
    error.image = 'image is required !'
  }
  if (!value.price) {
    error.price = 'price is required !'
  }
  if (!value.duration) {
    error.duration = 'duration is required !'
  }
  if (!value.redirectLink) {
    error.redirectLink = 'redirectLink is required !'
  }
  if (!value.pickup) {
    error.pickup = 'pickup is required !'
  }
  if (!value.packageInfo) {
    error.packageInfo = 'packageInfo is required !'
  }
  if (!value.isActive) {
    error.isActive = 'Required Field! Click on it'
  }
  return error
}

export const ErrorValidatorLogIn = (data) => {
  const error1 = {}
  if (!data.email) {
    error1.email = 'Email is required !'
  }
  if (!data.password) {
    error1.password = 'password is required'
  }
  return error1
}

export const ErrorValidatorSignUp = (data) => {
  const error2 = {}
  if (!data.email) {
    error2.email = 'Email is required !'
  }
  if (!data.name) {
    error2.name = 'Name is required !'
  }
  if (!data.password) {
    error2.password = 'password is required'
  }
  if (data.password !== data.cPassword) {
    error2.cPassword = 'Conform Password Match or Required'
  }
  if (!data.role) {
    error2.role = 'SecureKey is required'
  }

  if (!data.isActive) {
    error2.isActive = 'Click At least one is required'
  }
  return error2
}
