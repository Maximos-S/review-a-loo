export const searchLocation = async(lat, lng) => {
  const response = await fetch('/api/businesses/',{
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({"lat": lat, "lng": lng})
  });
  console.log(await response.json());
  return 
}