import React, { Fragment } from 'react'

type Props = {
  expr: any | (() => boolean)
  children: React.ReactChild | React.ReactChildren | React.ReactNode
}

export function When(props: Props) {
  const { expr, children } = props
  if (typeof expr === 'function' && !expr()) return <Fragment />
  if (!expr) return <Fragment />

  return typeof children === 'function' ? children() : children
}