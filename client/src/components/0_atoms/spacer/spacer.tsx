import React from 'react'

interface IProps {
  className?: string
}

export const Spacer = ({ className = '' }: IProps) => (
  <div className={className} style={{ flex: 1 }} />
)
