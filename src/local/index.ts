import { defineStorage } from './storage'
import expirePlugin from './plugins/expire'
import encryptPlugin from './plugins/encrypt'
import secret from '@/config/secret'

const storage = defineStorage()

storage.use(expirePlugin())
storage.use(encryptPlugin(secret.CRYPTO_JS))

export default storage