import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { App } from '../App'
import { Picker } from '../../components/Picker'

describe('App', () => {
  let props

  beforeEach(() => {
    props = {
      isFetching: undefined,
      dispatch: undefined,
      posts: undefined,
      selectedSubreddit: undefined
    }
  })

  it('renders without crashing given the required props', () => {
    props = {
      isFetching: false,
      dispatch: jest.fn(),
      selectedSubreddit: 'reactjs',
      posts: []
    }

    const wrapper = shallow(<App {...props} />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('always renders the Picker component', () => {
    props = {
      isFetching: false,
      dispatch: jest.fn(),
      selectedSubreddit: 'reactjs',
      posts: []
    }

    const wrapper = shallow(<App {...props} />)
    expect(wrapper.find(Picker)).toBeTruthy()
  })

  it('sets the selectedSubreddit prop as the `value` prop on the Picker component', () => {
    props = {
      isFetching: false,
      dispatch: jest.fn(),
      selectedSubreddit: 'reactjs',
      posts: []
    }

    const wrapper = shallow(<App {...props} />)
    const PickerComponent = wrapper.find(Picker)

    expect(PickerComponent.props().value).toBe(props.selectedSubreddit)
  })

  it('renders the Refresh button when the isFetching prop is false', () => {
    props = {
      isFetching: false,
      dispatch: jest.fn(),
      selectedSubreddit: 'reactjs',
      posts: []
    }

    const wrapper = shallow(<App {...props} />)

    expect(wrapper.find('button').length).toBe(1)
  })
})
