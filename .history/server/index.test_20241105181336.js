import {expect} from 'chai'

describe('GET Tasks', () => {
it('should get all tasks', async () => {const response = await fetch('http://localhost:3000/')
  const data = await response.json()
})