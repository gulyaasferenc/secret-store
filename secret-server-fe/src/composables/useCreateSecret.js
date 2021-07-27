import axios from 'axios'
import { ref } from 'vue'

const useCreateSecret = ({ secretText, expireAfterViews, expireAfter }) => {
  const creationResult = ref(null)
  const errorMsg = ref(null)
  const createSecret = async () => {
    try {
      const { data: result } = await axios.post(
        `${process.env.VUE_APP_BASE_API_URL}/api/secret`,
        {
          secret: secretText.value,
          expireAfterViews: Number(expireAfterViews.value),
          expireAfter: Number(expireAfter.value)
        }
      )
      creationResult.value = result.hash
    } catch (error) {
      errorMsg.value = error.response
        ? error.response.data.message
        : error.message
    }
  }

  return {
    createSecret,
    creationResult,
    errorMsg
  }
}

export default useCreateSecret
