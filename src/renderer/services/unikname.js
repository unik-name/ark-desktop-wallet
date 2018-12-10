import axios from 'axios'

export default class UnikNameService {
  static getUnikName (unikname) {
    let headers = {
      // 'Cache-Control': undefined,
      // 'X-Requested-With': undefined,
      // 'If-Modified-Since': undefined,
      // 'x-pm-appversion': undefined,
      // 'x-pm-uid': undefined,
      // 'x-pm-apiversion': undefined
    }

    // if (unikNameFrom) {
    //   headers['Authorization'] = `Basic ${unikNameFrom}`
    // } else {
    //   $scope.data.fromUnikName = undefined
    // }

    let uniknameAndLabel = unikname.replace('@', '').split('#')

    return axios({
      url: `http://localhost:3000/uniknames/${uniknameAndLabel[0]}/labels/${uniknameAndLabel[1] ? uniknameAndLabel[1] : 'default'}/types/ARK`,
      method: 'GET',
      headers: headers
    })
  }

  static async resolveUnikName (unikname) {
    let result
    try {
      if (unikname && unikname.indexOf('@') === 0) {
        let resolvedUnikname = await this.getUnikName(unikname)
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
            result = { error: response.data }
            break
          default:
            throw (e)
        }
      }
    }
    return result
  }
}
