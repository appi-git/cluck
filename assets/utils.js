export const savedColors = JSON.parse(localStorage.getItem("savedColors")) || {
  pclr: "#00BFFF",
  sclr: "#DC143C",
  bgclr: "#FFF8DC",
  bdclr: "#000000"
}

export function quatern(n) {
  let sixteens = 0;
  let fours = 0;
  let ones = 0;
  
  for (; n>=16; n-=16){
    sixteens++;
  }
  for (fours; n>=4 && n<16; n-=4){
    fours++;
  }
  for (ones; n>=1 && n<4; n-=1){
    ones++;
  }
  return {0:ones, 1:fours, 2:sixteens};
}