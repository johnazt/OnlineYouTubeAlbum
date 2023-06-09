import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY_YT
const MAX_DESCRIPTION_LENGTH = 250

// OBTIENE ID DE LINK QUE SE INGRESA EN EL INPUT
const extractVideoId = (link) => {
  const regex =
    /(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|y2u\.be\/)([a-zA-Z0-9_-]{11})/
  const match = link.match(regex)

  if (match && match[1]) {
    return match[1]
  } else {
    console.error('Enlace de YouTube no válido')
    return null
  }
}

// CONVIERTE DURATION A FORMATO DE MINUTOS Y SEGUNDOS
const convertDuration = (duration) => {
  const match = duration.match(/PT((\d+)H)?((\d+)M)?((\d+)S)?/)

  if (match) {
    const hours = match[2] ? parseInt(match[2]) : 0
    const minutes = match[4] ? parseInt(match[4]) : 0
    const seconds = match[6] ? parseInt(match[6]) : 0

    return {
      hours,
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    }
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
    let duration = response.data.items[0].contentDetails.duration

    const convertedDuration = convertDuration(duration)

    if (convertedDuration?.hours) {
      duration = `${convertedDuration.hours}:${convertedDuration.minutes}:${convertedDuration.seconds}`
    } else {
      duration = `${convertedDuration?.minutes}:${convertedDuration?.seconds}`
    }

    const video = {
      id: idVideo,
      title: videoData.title,
      duration,
      description: truncateDescription(videoData.description),
      thumbnails: videoData.thumbnails.high.url
    }

    return video
  } catch (error) {
    console.error(error)
    throw error
  }
}

//COMPRUEBA SI EL VIDEO YA EXISTE EN EL ARRAY
const existingVideo = (collection, docId) => {
  return collection.value.find((video) => video.videoID === docId)
}

export default {
  getVideoDetails,
  extractVideoId,
  existingVideo
}
