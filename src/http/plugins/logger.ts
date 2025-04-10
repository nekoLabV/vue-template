export default {
  beforeRequest(config: RequestConfig) {
    console.log('请求开始:', config)
  },
  afterResponse(response: Response) {
    console.log('请求成功:', response)
  },
  onError(error: Error) {
    console.error('请求失败:', error)
  }
}