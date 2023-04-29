import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY_YT
const MAX_DESCRIPTION_LENGTH = 250

// OBTIENE ID DE LINK QUE SE INGRESA EN EL INPUT
const extractVideoId = (link) => {
  const regex =
    /(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|y2u\.be\/)([a-zA-Z0-9_-]{11})/
  const match = link.match(regex);

  if (match && match[1]) {
    return match[1]
  } else {
    console.error('Enlace de YouTube no válido')
    return null
  }
}

// CONVIERTE DURATION A FORMATO DE MINUTOS Y SEGUNDOS
const convertDuration = (duration) => {
  const match = duration.match(/PT(\d+)M(\d+)S/)

  if (match && match.length === 3) {
    const minutes = parseInt(match[1])
    const seconds = parseInt(match[2]).toString().padStart(2, '0');
    return { minutes, seconds }
  }
  return null
}

// OBTIENE UNA DESCRIPCION DE MAXIMO 250 CARACTERES
const truncateDescription = (description) => {
  if (description.length <= MAX_DESCRIPTION_LENGTH) {
    return description
  } else {
    const truncatedText = description.substring(0, MAX_DESCRIPTION_LENGTH)
    const lastSpaceIndex = truncatedText.lastIndexOf(' ')
    return truncatedText.substring(0, lastSpaceIndex) + '...'
  }
}

// PETICION A YOUTUBE VIDEO API Y GENERA OBJETO VIDEO
const getVideoDetails = async (videoId) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    )
    const videoData = response.data.items[0].snippet
    const idVideo = response.data.items[0].id
    const duration = response.data.items[0].contentDetails.duration
    const convertedDuration = convertDuration(duration)

    const video = {
      id: idVideo,
      title: videoData.title,
      duration: `${convertedDuration.minutes}:${convertedDuration.seconds}`,
      description: truncateDescription(videoData.description),
      thumbnails: videoData.thumbnails.high.url
    }

    return video
  } catch (error) {
    console.error(error)
    throw error
  }
}



export default {
  getVideoDetails,
  extractVideoId
}
