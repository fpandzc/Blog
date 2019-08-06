const getTime = time => {
  let UTCTime = new Date(time)

  return UTCTime.toLocaleDateString()
}

export {
  getTime
}
