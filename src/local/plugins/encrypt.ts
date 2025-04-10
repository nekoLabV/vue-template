import CryptoJS from 'crypto-js'

export default function encryptPlugin(secretKey: string) {
  return {
    beforeSet(_key: string, data: any) {
      return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()
    },
    beforeGet(_key: string, data: any, defaultValue: any) {
      try {
        const bytes = CryptoJS.AES.decrypt(data, secretKey)
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      } catch (e) {
        console.warn('Decryption failed:', e)
        return defaultValue
      }
    }
  }
}