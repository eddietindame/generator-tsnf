import axios from 'axios'

describe('Test /<%= name %> endpoint', () => {
    const request = async () => {
        let res

        try {
            res = await axios({
                method: 'GET',
                url: 'http://localhost:3000/api/<%= name %>'
            })
        } catch (error) {
            res = error.response
        }

        return res.status
    }

    it('Sends 200 code on successful request', async done => {
        // all good
        const status = await request()
        expect(status).toEqual(200)
        done()
    })
})
