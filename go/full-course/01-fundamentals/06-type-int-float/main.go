package main

import (
	"fmt"
)

func main() {

  views1 := 100
  views2 := 200
  totalViews := views1 + views2

  likes := 10
  likes++
  likes++

  avgViews := totalViews / 2

  rating1 := 4.5
  rating2 := 4.8
  totalRatings := rating1 + rating2
  
  avgRatings := totalRatings / 2

  fmt.Println("Views:", totalViews)
  fmt.Println("Likes:", likes)
  fmt.Println("Avarage Views:", avgViews)
  fmt.Println("Ratings:", totalRatings)
  fmt.Println("Avarage Ratings:", avgRatings)
}
