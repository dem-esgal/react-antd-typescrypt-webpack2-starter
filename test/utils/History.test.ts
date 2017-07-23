import React from 'react'
import { history } from 'utils/History'

describe('History', () => {

  it('History is not empty', () => {
    expect(Object.keys(history).length).toBeGreaterThan(0)
  })
})
