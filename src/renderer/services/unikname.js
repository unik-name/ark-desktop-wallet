import axios from 'axios'

export default class UnikNameService {
  static getUnikName (unikname, currentUnikname) {
    let headers = {
      // 'Cache-Control': undefined,
      // 'X-Requested-With': undefined,
      // 'If-Modified-Since': undefined,
      // 'x-pm-appversion': undefined,
      // 'x-pm-uid': undefined,
      // 'x-pm-apiversion': undefined
    }

    if (currentUnikname) {
      headers['Authorization'] = `Basic ${currentUnikname.replace('@', '')}`
    }

    let uniknameAndLabel = unikname.replace('@', '').split('#')

    return axios({
      url: `http://localhost:3000/uniknames/${uniknameAndLabel[0]}/labels/${uniknameAndLabel[1] ? uniknameAndLabel[1] : 'default'}/types/ARK`,
      method: 'GET',
      headers: headers
    })
  }

  static async resolveUnikName (unikname, currentUnikname) {
    let result
    try {
      if (unikname && unikname.indexOf('@') === 0) {
        let resolvedUnikname = await this.getUnikName(unikname, currentUnikname)
        result = resolvedUnikname.data
      } else {
        result = {
          resolver: {
            address: unikname
          }
        }
      }
    } catch (e) {
      let response = e.response
      if (response && response.status) {
        switch (response.status) {
          case 401:
          case 403:
          case 404:
            result = { error: response.data, status: response.status }
            break
          default:
            throw (e)
        }
      }
    }
    return result
  }
}
