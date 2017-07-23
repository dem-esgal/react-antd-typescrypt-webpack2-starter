import {
  api,
  postData
} from 'utils/FetchData'

describe('FetchData', () => {

  it('Must be called on spot dispatch', () => {
    const dispatch = jest.fn()

    const action = postData('', {
      types: ['1', '2', '3', '4'],
      actionParams: {},
      params: {},
      onSuccess: () => {
      }
    })
    action(dispatch)

    expect(dispatch).toHaveBeenCalled()
  })

  it('api is not empty', () => {
    expect(api).not.toBeNull()
  })

  it('api.post is not empty', () => {
    expect(api.post).not.toBeNull()
  })

})
