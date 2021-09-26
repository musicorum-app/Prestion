export function getScreenRefreshRate (): Promise<number> {
  return new Promise((resolve) => {
    requestAnimationFrame(t1 =>
      requestAnimationFrame(t2 => resolve(1000 / (t2 - t1)))
    )
  })
}
