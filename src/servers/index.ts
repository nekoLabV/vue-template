import http from '@/http'

async function getData(url: string) {
	return await http.get(`${url}`)
}

export default {
	getData
}