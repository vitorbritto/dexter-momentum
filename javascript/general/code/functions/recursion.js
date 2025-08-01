// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// RECURSION
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function fetchWater(count) {
  console.log('Fetching water... ', count, '\n')
  
  if (count === 0) {
    console.log("No more...")
    return
  }
  
  fetchWater(count - 1)
}

fetchWater(5)