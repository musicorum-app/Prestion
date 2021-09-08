
export type ValueHandler = number | ((value: number) => number)

export interface SizeBreakPointValues {
  xs?: ValueHandler // Extra Small
  sm?: ValueHandler // Small
  md?: ValueHandler // Medium
  lg?: ValueHandler // Large
  xl?: ValueHandler // Extra Large
}

export enum ReactiveValueAxis {
  Width,
  Height
}

export type ValueDefiner = (value: number) => void

export default class ReactiveSizeListener {
  add (
    valueAxis: ReactiveValueAxis,
    breakPointe: SizeBreakPointValues,
    valueDefiner: ValueDefiner
  ) {
    // TODO
  }
}

const sl = new ReactiveSizeListener()

sl.add(
  ReactiveValueAxis.Width,
  {
    xs: (width) => width * 0.7,
    sm: 30
  },
  (value) => console.log(value)
)
