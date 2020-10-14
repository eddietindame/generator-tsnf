<% if (next) { %>import { NextApiRequest, NextApiResponse } from 'next'<% } else { %>import { NowRequest, NowResponse } from '@now/node'<% } %>

export const <%= name %>Handler = (_req: <%= next ? 'NextApiRequest' : 'NowRequest' %>, res: <%= next ? 'NextApiResponse' : 'NowResponse' %>) => {
    res.send('Hello, World!')
}

export default <%= name %>Handler
