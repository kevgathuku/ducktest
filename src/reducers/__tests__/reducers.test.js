import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../../actions'

import { postsBySubreddit, selectedSubreddit } from '../index'

describe('app reducer', () => {

  describe('selectedSubreddit', () => {
    it('should return the default state', () => {
      expect(selectedSubreddit(undefined, {})).toBe('reactjs')
    })

    it('should update the selectedSubreddit', () => {
      const subreddit = 'frontend'
      const action = {
        type: SELECT_SUBREDDIT,
        subreddit
      }
      expect(selectedSubreddit(undefined, action)).toBe(subreddit)
    })
  })

  describe('postsBySubreddit', () => {
    const subreddit = 'frontend'

    it('should return the default state', () => {
      expect(postsBySubreddit(undefined, {})).toEqual({})
    })

    it('should handle INVALIDATE_SUBREDDIT', () => {
      const action = {
        type: INVALIDATE_SUBREDDIT,
        subreddit
      }

      expect(postsBySubreddit({}, action)).toEqual({
        [subreddit]: {
          isFetching: false,
          didInvalidate: true,
          items: []
        }
      })
    })

    it('should handle REQUEST_POSTS', () => {
      const action = {
        type: REQUEST_POSTS,
        subreddit
      }

      expect(postsBySubreddit({}, action)).toEqual({
        [subreddit]: {
          isFetching: true,
          didInvalidate: false,
          items: []
        }
      })
    })

    it('should handle RECEIVE_POSTS', () => {
      const posts = ['post 1', 'post 2']
      const receivedAt = Date.now()

      const action = {
        type: RECEIVE_POSTS,
        subreddit,
        posts,
        receivedAt
      }

      expect(postsBySubreddit({}, action)).toEqual({
        [subreddit]: {
          isFetching: false,
          didInvalidate: false,
          items: posts,
          lastUpdated: receivedAt
        }
      })
    })
  })

})
