const GOOGLE_API_KEY ="AIzaSyA9HNf-Zn_0EZ1UVHl7Csc1KUhTGSGG_vU";
export default function getMapPreview(latitude, longitude) {
  const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  // console.log(imagePreviewURL)
  return imagePreviewURL;
}

export async function getAddress(lat,lng){
  const url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  const response = await fetch(url)
  if(!response.ok){
    throw new Error('Failed to get address')
  }
  const data = await response.json()
  if(data.results && data.results.length>0){
    const address = data.results[0].formatted_address
    return address
    }
    return "Dummy Address"
  }
