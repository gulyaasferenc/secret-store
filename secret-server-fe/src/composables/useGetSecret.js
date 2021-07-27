import { ref, reactive } from 'vue'
import axios from 'axios'

const useGetSecret = (hash) => {
  const result = reactive({})
  const errorMsg = ref(null)

  const getHash = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.VUE_APP_BASE_API_URL}/api/secret/${hash.value}`
      )
      result.value = data
    } catch (error) {
      errorMsg.value = error.response
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
