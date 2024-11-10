import {expect} from 'chai'

describe('GET Tasks', () => {
it('should get all tasks', async () => {
  const response = await fetch('http://localhost:3000/')
  const data = await response.json()

  expect(response.status).to.equal(200)
  expect(data).to.be.an('array').that.is.not.empty
  expect(data[0]).to.include.all.keys('id', 'description')
  

})
 })