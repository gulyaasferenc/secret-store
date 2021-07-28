import { reactive } from 'vue'
import axios from 'axios'

const useGetSecret = (hash) => {
  const result = reactive({
    data: null
  })
  const errorMsg = reactive({
    message: null
  })

  const getHash = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.VUE_APP_BASE_API_URL}/api/secret/${hash.value}`
      )
      result.data = data
    } catch (error) {
      errorMsg.message = error.response
        ? error.response.data.message
        : error.message
    }
  }

  return {
    getHash,
    result,
    errorMsg
  }
}

export default useGetSecret
