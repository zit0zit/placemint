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

  return shuffled.slice(min).filter((i) => i != undefined)
}

const MS_PER_MINUTE = 1000 * 60
export function dateDiff(a: Date, b: Date) {
  a.getMinutes
  const utc1 = a.valueOf()
  const utc2 = b.valueOf()

  const minusDiff = Math.floor((utc2 - utc1) / MS_PER_MINUTE)
  const hourDiff = Math.floor(minusDiff / 60)
  const dateDiff = Math.floor(hourDiff / 60)

  if (dateDiff > 0) {
    return dateDiff + 'd'
  }
  if (hourDiff > 0) {
    return hourDiff + 'h'
  }
  return minusDiff + 'm'
}
