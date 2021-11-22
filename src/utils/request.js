const baseUrl = ''

export default async function (url, params) {
  return new Promise((res, rej) => {
    fetch(baseUrl + url, params)
      .then((response) => response.json())
      .then((myJson) => res(myJson))
      .catch(error => rej(error))
  })
}