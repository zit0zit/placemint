export function elmContains(parent: Element, child: Element) {
  if (parent == child) return true

  for (let i = 0; i < parent.children.length; ++i) {
    if (elmContains(parent.children[i], child)) {
      return true
    }
  }

  return false
}

export function getRandomSubarray<T>(arr: T[], size: number) {
  let temp,
    index,
    i = arr.length

  const shuffled = arr.slice(0),
    min = i - size

  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }

  return shuffled.slice(min)
}
